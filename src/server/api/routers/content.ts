import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@CarteBlanche/server/api/trpc";
import { ContentType } from "@prisma/client";

export const contentRouter = createTRPCRouter({
  /** CREATE ROUTES */
  createContent: publicProcedure
    .input(
      z.object({
        authorId: z.string(),
        type: z.nativeEnum(ContentType),
        title: z.string(),
        caption: z.string(),
        imgURL: z.string(),
        content: z.optional(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.content.create({
        data: {
          title: input.title,
          type: input.type,
          caption: input.caption,
          imgURL: input.imgURL,
          content: input.content,
          authorId: input.authorId,
        },
      });
    }),

  /** GET ROUTES */
  getAllContent: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.content.findMany({
      where: {
        isDeleted: false,
      },
    });
  }),

  getAllAudioContent: publicProcedure.input(z.object({})).query(({ ctx }) => {
    return ctx.prisma.content.findMany({
      where: {
        type: ContentType.AUDIO,
        isDeleted: false,
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
          isDeleted: false,
        },
      });
    }),

  getContentById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const content = await ctx.prisma.content.findUnique({
        where: {
          id: input.id,
        },
      });
      if (content) {
        if (content.isDeleted) {
          throw new Error("Content is deleted");
        }
      }
      return content;
    }),

  getAllFeaturedContent: publicProcedure
    .input(z.object({}))
    .query(({ ctx }) => {
      return ctx.prisma.content.findMany({
        where: {
          isFeatured: true,
          isDeleted: false,
        },
      });
    }),

  /** PUT ROUTES */
  editContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        caption: z.string(),
        imgURL: z.string(),
        content: z.optional(z.string()),
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
          imgURL: input.imgURL,
          content: input.content,
        },
      });
    }),

  toggleFeaturedContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        isFeatured: z.boolean(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.content.update({
        where: {
          id: input.id,
        },
        data: {
          isFeatured: input.isFeatured,
        },
      });
    }),

  deleteContent: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.content.update({
        where: {
          id: input.id,
        },
        data: {
          isDeleted: true,
        },
      });
    }),
});
