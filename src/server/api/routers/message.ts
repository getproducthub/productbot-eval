import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { assistant } from "~/app/_utils/ai";

export interface Message {
  id: number;
  question: string;
  answer: string | null;
}

const messagesDB = new Map<number, Message>();

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        question: z.string().min(3),
      }),
    )
    .mutation(async ({ input }) => {    
      const message: Message = {
        id: messagesDB.size + 1,
        question: input.question,
        answer: await assistant.ask(input.question),
      };
  
      messagesDB.set(message.id, message);

      return message;
    }),

  getList: publicProcedure.query(() => Array.from(messagesDB.values()).reverse()),
});
