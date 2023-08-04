import {
  createTRPCRouter,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";
import { z } from "zod";

const breakpointLayoutSchema = z.array(
  z.object({
    w: z.number(),
    h: z.number(),
    x: z.number(),
    y: z.number(),
    i: z.string(),
    moved: z.boolean(),
    static: z.boolean(),
  })
);

export const layoutRouter = createTRPCRouter({
  /** UPSERT GRID LAYOUT */
  upsertLayout: publicProcedure
    .input(
      z.object({
        name: z.string(),
        layout: z.object({
          lg: z.optional(breakpointLayoutSchema),
          md: z.optional(breakpointLayoutSchema),
          sm: z.optional(breakpointLayoutSchema),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.layout.upsert({
        where: {
          name: input.name,
        },
        update: {
          layout: input.layout,
        },
        create: {
          name: input.name,
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
