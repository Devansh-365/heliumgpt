"use client";

import { ChatItem } from "./chat-item";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "@prisma/client";
import { usePathname } from "next/navigation";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";

export const ChatList = () => {
  const { data: chats, error } = useSWR<Chat[]>(`/api/chats`, fetcher);
  const router = usePathname();

  return (
    <div className="mt-4 flex flex-col gap-1 flex-1 overflow-y-auto">
      {chats &&
        chats.map((chat, i) => {
          return (
            <ChatItem key={i} chat={chat} selected={router === `/${chat.id}`} />
          );
        })}
    </div>
  );
};
