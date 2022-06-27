import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const iotaRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("all", {
    async resolve({ ctx }) {
      return ctx.prisma.iota.findMany({
        where: {
          userId: ctx.session!.user.id,
        },
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
  })
  .mutation("add", {
    input: z.object({
      message: z.string(),
    }),
    async resolve({ ctx, input }) {
      console.log(input);

      return ctx.prisma.iota.create({
        data: {
          message: input.message,
          userId: ctx.session!.user.id,
        },
      });
    },
  });
