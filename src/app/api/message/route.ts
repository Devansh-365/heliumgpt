import db from "@/lib/db";
import { getCompletions } from "@/lib/openai";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import * as z from "zod";

const apiSchema = z.object({
  content: z.string(),
  chatId: z.string(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { content, chatId } = apiSchema.parse(json);

    const userMessage = await db.message.create({
      data: {
        content,
        role: "user",
        chatId,
      },
    });

    const systemPrompt = "";
    const openAIResponse = await getCompletions(systemPrompt, [
      { role: "user", content: content },
    ]);
    const result = await openAIResponse.json();

    const aiMessage = await db.message.create({
      data: {
        content: result.choices[0].message.content,
        chatId,
        role: "ai",
      },
    });

    return NextResponse.json({ userMessage, aiMessage });
  } catch (error) {
    console.log("[MESSAGE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
