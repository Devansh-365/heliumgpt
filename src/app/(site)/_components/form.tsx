"use client";

import { Input } from "@/components/ui/input";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";

interface FormProps {
  chatId: any;
}

export const Form = ({ chatId }: FormProps) => {
  const { data: session, status } = useSession();
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (message === "") return;
    console.log("message sent");
    const temp = message;
    setMessage("");
    try {
      const response = await axios.post("/api/message", {
        role: "user",
        content: temp,
        chatId: chatId,
      });
      console.log("Message sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="relative px-2 sm:px-12 lg:pr-[460px] w-full bg-zinc-50">
      <Input
        placeholder="Message HeliumGPT..."
        className="border-[1px] border-neutral-500 ring-none rounded-xl bg-inherit text-black placeholder:text-neutral-400 h-12"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={status !== "authenticated"}
      />
    </div>
  );
};
