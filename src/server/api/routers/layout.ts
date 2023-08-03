import {
  createTRPCRouter,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";
import { z } from "zod";

export const layoutRouter = createTRPCRouter({
  /** UPSERT GRID LAYOUT */
  upsertLayout: publicProcedure
    .input(
      z.object({
        name: z.string(),
        layout: z.any(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.layout.upsert({
        where: {
          name: input.name,
        },
        update: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          layout: input.layout,
        },
        create: {
          name: input.name,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          layout: input.layout,
        },
      });
    }),

  getLayout: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.layout.findUnique({
        where: {
          name: input.name,
        },
      });
    }),
});
