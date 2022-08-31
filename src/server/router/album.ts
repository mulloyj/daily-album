import { createRouter } from "./context";
import { z } from "zod";

export const albumRouter = createRouter()
  .query("getCurrent", {
    async resolve({ctx}) {
      const todayDate = new Date();
      const today = todayDate.toISOString().split('T')[0];
      
      return await ctx.prisma.listenedTo.findFirst({
        where: {
            date: today,
        },
        select: {
          date: false,
          Album: true,
        }
      });
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.album.findMany();
    },
  }).query("getByNameAndArtist", {
    input: z.object({
      title: z.string(),
      artist: z.string(),
    }),
    async resolve({ctx, input}) {
      return await ctx.prisma.album.findUnique({
        where: {
          title_artist: {
            title: input.title,
            artist: input.artist,
          }
        }
      });
    },
  }).mutation("addAlbum", {
    input: z.object({
      title: z.string(),
      artist: z.string(),
      image: z.string(),
      link: z.string(),
    }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.album.create({
        data: {
          title: input.title,
          artist: input.artist, 
          image: input.image, 
          link: input.link,
        }
      })
    }
  });
