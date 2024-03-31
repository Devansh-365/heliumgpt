"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { MessageBox } from "./msg-box";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Message } from "@prisma/client";

interface BodyProps {
  chatId: string;
}

export const Body = ({ chatId }: BodyProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/chats/${chatId}`);
        setMessages(response.data.messages);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <>
      <ScrollArea className="max-h-[calc(100%-150px)] h-full w-full flex-1">
        <div className="px-4 sm:px-12 md:px-52 2xl:px-[430px] relative">
          {messages &&
            messages.map((message) => (
              <MessageBox
                key={message.id}
                message={message}
                userImageUrl={session?.user?.image || ""}
              />
            ))}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>
    </>
  );
};