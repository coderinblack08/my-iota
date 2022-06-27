// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { exampleRouter } from "./example";
import { iotaRouter } from "./iota";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("iota.", iotaRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
