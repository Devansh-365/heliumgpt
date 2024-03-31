"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { ChatList } from "./chat/chat-list";
import axios from "axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function Sidebar() {
  const { data: session, status } = useSession();

  const createNewChat = async () => {
    try {
      if (!session?.user) {
        return toast.error("You must be logged in to create a new chat.");
      }
      const response = await axios.post("/api/chats", {
        title: "New Chat",
      });
      if (response.status !== 200) {
        return toast.error("Failed to create chat");
      }
      toast.success("New chat created:");
    } catch (error) {
      console.error("Error creating chat:", error);
      alert("Failed to create chat. Please try again.");
    }
  };

  return (
    <div className="sticky top-12 h-full hidden lg:flex lg:flex-col lg:w-[300px] p-4">
      <Button
        className="w-full flex justify-start items-center"
        onClick={createNewChat}
      >
        <PlusCircle className="w-5 h-5" />
        <p className="font-semibold text-start ml-3">New Chat</p>
      </Button>
      <ChatList />
    </div>
  );
}
