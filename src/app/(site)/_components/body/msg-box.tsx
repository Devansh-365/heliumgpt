import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Markdown from "./markdown";
import { Message } from "@prisma/client";

interface MessageBoxProps {
  message: Message;
  userImageUrl?: string;
}

export const MessageBox = ({ message, userImageUrl }: MessageBoxProps) => {
  const nameString = message.role === "user" ? "You" : "HeliumGPT";
  const imageUrl = message.role === "user" ? userImageUrl : "/helium.png";

  return (
    <div className="flex space-x-3 items-start mb-3 max-w-[calc(80%)] md:max-w-full text-wrap">
      <Avatar className="w-7 h-7 text-black fill-black">
        <AvatarImage src={imageUrl} className="text-black fill-white" />
        <AvatarFallback className="text-neutral-900 font-semibold">
          {nameString[0]}
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[calc(80%)] text-black">
        <h3 className="font-bold">{nameString}</h3>
        <div className="flex flex-grow flex-col gap-3 gap-y-5">
          <Markdown content={message.content} />
        </div>
      </div>
    </div>
  );
};
