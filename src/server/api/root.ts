import { createTRPCRouter } from "@CarteBlanche/server/api/trpc";
import { userRouter } from "./routers/user";
import { contentRouter } from "./routers/content";
import { layoutRouter } from "./routers/layout";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  content: contentRouter,
  layout: layoutRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
