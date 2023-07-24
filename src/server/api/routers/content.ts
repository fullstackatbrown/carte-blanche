import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";
import { ContentType } from "@prisma/client";

export const contentRouter = createTRPCRouter({
  createContent: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        type: z.nativeEnum(ContentType),
        title: z.string(),
        caption: z.string(),
        contentURL: z.string(),
        textContent: z.optional(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.content.create({
        data: {
          title: input.title,
          type: input.type,
          caption: input.caption,
          contentURL: input.contentURL,
          textContent: input.textContent,
          authorId: input.authorId,
        },
      });
    }),

  getAllContent: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.content.findMany();
  }),

  getAllAudioContent: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.content.findMany({
      where: {
        type: ContentType.AUDIO,
      },
    });
  }),

  getAllTextAndImageContent: publicProcedure
    .input(z.object({}))
    .query(({ ctx }) => {
      return ctx.prisma.content.findMany({
        where: {
          type: {
            in: [ContentType.IMAGE, ContentType.TEXT],
          },
        },
      });
    }),

  getContentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.content.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  editContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        caption: z.string(),
        contentUrl: z.string(),
        textContent: z.optional(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.content.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          caption: input.caption,
          contentURL: input.contentUrl,
          textContent: input.textContent,
        },
      });
    }),
});
