import OpenAI from "openai";

export interface AIAssistant {
  ask (question: string): Promise<string | null>;
}

export class AIAssistantImpl implements AIAssistant {
  private readonly engine = new OpenAI();

  async ask(question: string): Promise<string | null> {
    const completion = await this.engine.chat.completions.create({
      messages: [{ role: "system", content: question }],
      model: "gpt-4o",
    });

    return completion.choices[0]?.message.content ?? null;
  }
}

export const assistant = new AIAssistantImpl();
