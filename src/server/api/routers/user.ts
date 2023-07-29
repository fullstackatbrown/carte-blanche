import {
  createTRPCRouter,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";
import { Role } from "@prisma/client";
import { z } from "zod";

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

  getAllUsers: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  updateUserRole: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        role: z.nativeEnum(Role),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: {
          email: input.email,
        },
        data: {
          role: input.role,
        },
      });
    }),
});
