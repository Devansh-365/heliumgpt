import { Input } from "@/components/ui/input";
import { useState } from "react";

interface FormProps {
  chatId: any;
}

export const Form = ({ chatId }: FormProps) => {
  //   const chat = useQuery(api.chats.get, { id: chatId });
  //   const sendMessage = useAction(api.messages.submit);

  //   const [message, setMessage] = useState<string>("");

  //   if (chat === undefined) {
  //     return null;
  //   }

  //   if (chat === null) {
  //     return <div>Chat not found!</div>;
  //   }

  //   const handleSendMessage = async () => {
  //     if (message === "") return;
  //     console.log("message sent");
  //     const temp = message;
  //     setMessage("");
  //     await sendMessage({
  //       role: "user",
  //       content: temp,
  //       chatId: chat._id,
  //     });
  //   };

  //   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       handleSendMessage();
  //     }
  //   };

  return (
    <div className="relative px-2 sm:px-12 md:px-52 lg:pr-[500px] 2xl:px-96 w-full bg-zinc-50">
      <Input
        placeholder="Message HeliumGPT..."
        className="border-[1px] border-neutral-500 ring-none rounded-xl bg-inherit text-black placeholder:text-neutral-400 h-12"
        // value={message}
        // onChange={(e) => setMessage(e.target.value)}
        // onKeyDown={handleKeyDown}
      />
    </div>
  );
};
