import { createProtectedRouter } from "./protected-router";

// Example router with queries that can only be hit if the user requesting is signed in
export const accountRouter = createProtectedRouter()
.query("getCurrent", {
  async resolve({ ctx }) {
    return ctx.prisma.account.findUnique({
      where: {
        id: ctx.session?.user?.id,
      }
    });
  },
});
