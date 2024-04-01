import { Button, buttonVariants } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowBigRightDash, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Form } from "./_components/form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";

export default async function Home() {
  const user = await getCurrentUser();
  const chats = await db.chat.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (user) {
    redirect(`/${chats[0].id}`);
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex flex-col h-full w-full">
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="border text-center py-8 px-4 text-black my-auto w-fit rounded-lg">
            <h2>Authentication Required for HeliumGPT</h2>
            <p className="text-center max-w-sm text-sm text-neutral-400 my-2">
              Please log in to access HeliumGPT. Your authentication ensures
              secure and personalized use."
            </p>
            <Link
              href="/login"
              className={buttonVariants({ className: "mt-4" })}
            >
              Login
            </Link>
          </div>
        </div>
        <div className="w-full fixed bottom-0">
          <Form chatId={"params.chatId"} />
          <p className="w-full text-center text-xs text-neutral-400 my-2 lg:pr-[300px]">
            HeliumGPT could make errors. Consider checking important
            information.
          </p>
        </div>
      </div>
    </div>
  );
}
