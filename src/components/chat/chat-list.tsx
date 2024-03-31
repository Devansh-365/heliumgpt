"use client";

import { ChatItem } from "./chat-item";
import { useEffect, useState } from "react";
import axios from "axios";
import { Chat } from "@prisma/client";
import { usePathname } from "next/navigation";

export const ChatList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const router = usePathname();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/chats`);
        setChats(response.data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (chats === null) {
    return null;
  }

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
