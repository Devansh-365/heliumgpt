"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { ChatList } from "./chat/chat-list";

export default function Sidebar() {
  return (
    <div className="h-full hidden lg:flex lg:flex-col lg:w-[300px] p-4">
      <Button
        className="w-full flex justify-start items-center"
        onClick={() => {}}
      >
        <PlusCircle className="w-5 h-5" />
        <p className="font-semibold text-start ml-3">New Chat</p>
      </Button>
      <ChatList />
    </div>
  );
}
