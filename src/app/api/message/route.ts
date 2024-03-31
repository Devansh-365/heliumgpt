import { getCompletions } from "@/lib/openai";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import * as z from "zod";

const messageSchema = z.object({
  messages: z.string(),
});

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { messages } = messageSchema.parse(json);
    // Generate the system prompt based on the database type
    const systemPrompt = "";
    const openAIResponse = await getCompletions(systemPrompt, messages);
    const result = await openAIResponse.json();
    return NextResponse.json(result);
  } catch (error) {
    console.log("[MESSAGE_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
