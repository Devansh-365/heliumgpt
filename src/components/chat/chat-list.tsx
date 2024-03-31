"use client";

import { useParams, useRouter } from "next/navigation";
import { ChatItem } from "./chat-item";

export const ChatList = () => {
  const chats = [1, 2, 3];
  //   const { chatId } = useParams<{ chatId: Id<"chats"> }>();
  const router = useRouter();
  if (chats === undefined) {
    return <div>Loading...</div>;
  }

  if (chats === null) {
    return null;
  }

  return (
    <div className="mt-4 flex flex-col gap-1 flex-1 overflow-y-auto">
      {chats.map((chat, i) => (
        <ChatItem key={i} chat={chat} selected={true} />
      ))}
    </div>
  );
};
