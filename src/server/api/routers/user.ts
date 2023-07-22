import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";

export const userRouter = createTRPCRouter({
  getUser: publicProcedure
    .input(z.object({ id: z.optional(z.string()) }))
    .query(({ input, ctx }) => {
      if (!input.id) return null;
      return ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });
    }),
});
