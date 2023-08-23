import { createTRPCMsw } from "msw-trpc";
import { AppRouter } from "server/api/root";
import { setupServer } from "msw/node";
import * as devalue from "devalue";

const serialize = (object: any) => devalue.uneval(object);
const deserialize = (object: any) => eval(`(${object})`);

const config = {
    transformer: {
        input: {
            serialize,
            deserialize,
        },
        output: {
            serialize,
            deserialize,
        },
    },
};

const trpcMsw = createTRPCMsw<AppRouter>(config);

export const server = setupServer(
    trpcMsw.hello.sayHello.query((_, res, ctx) => {
        return res(ctx.status(200), ctx.data("hello from tRPC!"));
    })
);
