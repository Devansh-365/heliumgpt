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

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const { title } = apiSchema.parse(json);

    const chat = await db.chat.create({
      data: {
        title,
        userId: user?.id,
      },
    });

    return NextResponse.json(chat);
  } catch (error) {
    console.log("[CHATS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
