import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { ZodError } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import * as devalue from "devalue";

import prisma from "db";

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
    const { req, res } = _opts;

    return {
        req,
        res,
        prisma,
    };
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: {
        serialize: (object) => devalue.uneval(object),
        deserialize: (object) => eval(`(${object})`),
    },
    errorFormatter({ shape, error }) {
        let newShape = { ...shape };

        if (error.cause instanceof ZodError) {
            if (error.cause.issues[0]?.message) {
                const message = error.cause.issues[0]?.message;

                newShape.message = message;
            }
        }

        return { ...newShape };
    },
});

const isAuth = t.middleware(({ ctx, next }) => {
    const { req } = ctx;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Access token is invalid.",
        });

    return next({
        ctx: {
            token,
        },
    });
});

export const createTRPCRouter = t.router;

export const privateProcedure = t.procedure.use(isAuth);

export const publicProcedure = t.procedure;
