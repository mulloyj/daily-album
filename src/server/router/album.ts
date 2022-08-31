import { createRouter } from "./context";
import { z } from "zod";

export const albumRouter = createRouter()
  .query("getCurrent", {
    async resolve({ctx}) {
      return await ctx.prisma.album.findFirst();
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.album.findMany();
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
