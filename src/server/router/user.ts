import { PrivacyEnum } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  })
  .query("get", {
    async resolve({ ctx }) {
      return ctx.prisma.user.findFirst({
        where: {
          id: ctx.session!.user.id,
        },
        select: {
          id: true,
          name: true,
          bio: true,
          privacy: true,
          twitter: true,
          github: true,
          instagram: true,
        },
      });
    },
  })
  .mutation("update", {
    input: z.object({
      id: z.string(),
      name: z.string().nullish(),
      bio: z.string().nullish(),
      privacy: z.nativeEnum(PrivacyEnum),
      twitter: z.string().nullish(),
      github: z.string().nullish(),
      instagram: z.string().nullish(),
    }),
    async resolve({ ctx, input }) {
      const { id, ...data } = input;
      return ctx.prisma.user.update({ where: { id }, data });
    },
  });
