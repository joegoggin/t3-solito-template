import { Platform } from "react-native";

const tunnel = "https://eleven-rules-play.loca.lt";

export const API =
    Platform.OS === "web"
        ? "http://localhost:3000/api/trpc"
        : `${tunnel}/api/trpc`;
