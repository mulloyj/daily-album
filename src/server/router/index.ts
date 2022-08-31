// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { albumRouter } from "./album";
import { accountRouter } from "./account";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("album.", albumRouter)
  .merge("account.", accountRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
