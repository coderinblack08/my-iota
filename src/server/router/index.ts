// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

import { exampleRouter } from "./example";
import { iotaRouter } from "./iota";
import { userRouter } from "./user";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("iota.", iotaRouter)
  .merge("user.", userRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
