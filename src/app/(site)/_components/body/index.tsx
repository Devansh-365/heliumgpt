"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useRef, useState } from "react";
import { MessageBox } from "./msg-box";
import { useSession } from "next-auth/react";
import axios from "axios";
import { Message } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface BodyProps {
  chatId: string;
}

export const Body = ({ chatId }: BodyProps) => {
  const { data: messages, error } = useSWR<Message[]>(
    `/api/chats/${chatId}`,
    fetcher
  );
  const { data: session } = useSession();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  if (error) return <div>Failed to load messages</div>;
  if (!messages) return <div>Loading messages...</div>;

  return (
    <>
      <ScrollArea className="mt-4 max-h-[calc(100%-150px)] h-full w-full flex-1 pb-32">
        <div className="px-4 sm:px-12 relative">
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
