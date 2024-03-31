"use client";

import { Button } from "@/components/ui/button";
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

export default function Home() {
  return (
    <div className="relative w-full h-full flex flex-col">
      <div className="flex flex-col h-full w-full">
        {/* <Body chatId={params.chatId} /> */}
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
