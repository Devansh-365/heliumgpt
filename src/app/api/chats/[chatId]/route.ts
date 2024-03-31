import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import { NextResponse } from "next/server";
import * as z from "zod";

const apiSchema = z.object({
  title: z.string(),
});

export async function GET(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chats = await db.chat.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(chats);
  } catch (error) {
    console.log("[CHATS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const data = apiSchema.parse(json);

    const chat = await db.chat.update({
      where: {
        id: params.chatId,
      },
      data: {
        title: data.title,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log("[CHATS_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { chatId: string } }
) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.chatId) {
      return new NextResponse("Chat id is required", { status: 400 });
    }

    const chat = await db.chat.delete({
      where: {
        id: params.chatId,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log("[CHAT_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
