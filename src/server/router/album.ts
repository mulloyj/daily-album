import { createRouter } from "./context";
import { z } from "zod";
import * as trpc from '@trpc/server';

export const albumRouter = createRouter()
  .query("getCurrent", {
    async resolve({ctx}) {
      const today = new Date();
      const offset = today.getTimezoneOffset(); // today is currently in UTC, need it in users time zone
      today.setHours(- offset / 60,0,0,0); // fix to get the date in the right format
      
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
  }).query("updateCurrent", {
    async resolve({ ctx }) {
      const today = new Date();
      const offset = today.getTimezoneOffset(); // today is currently in UTC, need it in users time zone
      today.setHours(- offset / 60,0,0,0); // fix to get the date in the right format

      const current = await ctx.prisma.listenedTo.findFirst({
        where: {
          date: today,
        },
        select: {
          date: false,
          Album: true,
        }
      });

      if (current) {
        return current;
      }

      const notListenedTo = await ctx.prisma.album.findMany({
        where: {
          listenedTo: undefined,
        }
      });

      const choice = notListenedTo[Math.floor(Math.random() * notListenedTo.length)];

      if (!choice) {
        throw new trpc.TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Could not find an album to set to current',
        })
      }

      return await ctx.prisma.listenedTo.create({
        data: {
          date: today,
          Album: {
            connect: {
              title_artist: {
                title: choice.title,
                artist: choice.artist,
              }
            }
          }
        },
        select: {
          date: false,
          Album: true,
        }
      })
    }
  });
