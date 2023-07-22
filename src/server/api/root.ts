import { createTRPCRouter } from "@CarteBlanche/server/api/trpc";
import { userRouter } from "./routers/user";
import { contentRouter } from "./routers/content";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  content: contentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
