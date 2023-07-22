import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";

export const contentRouter = createTRPCRouter({
  createTextContent: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        title: z.string(),
        caption: z.string(),
        contentUrl: z.string(),
        textContent: z.string(),
      })
    )
    .query(({ input, ctx }) => {
      return ctx.prisma.content.create({
        data: {
          title: input.title,
          type: "TEXT",
          caption: input.caption,
          contentURL: input.contentUrl,
          textContent: input.textContent,
          authorId: input.authorId,
        },
      });
    }),
});
