import { z } from "zod";
import OpenAI from "openai";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const openai = new OpenAI();

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
        question: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: input.question }],
        model: "gpt-4o",
      });

      const message: Message = {
        id: messagesDB.size + 1,
        question: input.question,
        answer: completion.choices[0]?.message.content ?? null,
      };
  
      messagesDB.set(message.id, message);

      return message;
    }),

  getList: publicProcedure.query(() => Array.from(messagesDB.values()).reverse()),
});
