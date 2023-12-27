import { type Static, Type } from "@sinclair/typebox";

export const PingDto = Type.Object({
  pong: Type.Array(Type.String()),
});
export type PingDto = Static<typeof PingDto>;
