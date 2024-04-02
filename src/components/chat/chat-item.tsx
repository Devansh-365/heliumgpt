import { cn, fetcher } from "@/lib/utils";
import { Chat } from "@prisma/client";
import axios from "axios";
import { ArrowDownToLine, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

interface ChatItemProps {
  chat: Chat;
  selected: boolean;
}

export const ChatItem = ({ chat, selected }: ChatItemProps) => {
  //   const rename = useMutation(api.chats.rename);
  //   const remove = useMutation(api.chats.remove);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title || "");

  const router = useRouter();

  const hadleClick = () => {
    if (!selected) {
      router.push(`/${chat.id}`);
    }
  };

  const handleRename = async (chatId: string) => {
    try {
      await axios.patch(`/api/chats/${chat.id}`, { title });
      toast.success("Chat Name edited");
      mutate(`/api/chats`);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating chat title:", error);
    }
  };

  const handleDelete = async (chatId: string) => {
    try {
      await axios.delete(`/api/chats/${chatId}`);
      toast.success("Chat deleted");
      mutate(`/api/chats`);
      router.push("/");
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  return (
    <div
      key={chat.title}
      className={cn(
        "group relative flex w-full p-2 rounded-md hover:bg-zinc-300 cursor-pointer text-black text-sm",
        selected ? "bg-zinc-200" : "bg-zinc-100 border border-zinc-300"
      )}
      onClick={hadleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => handleRename(chat.id)}
          autoFocus
          className="outline-none bg-transparent w-[170px]"
        />
      ) : (
        <div className="truncate max-w-[200px]">{chat.title}</div>
      )}
      <div className="absolute top-1/2 -translate-y-1/2 right-2 flex z-10">
        {isEditing ? (
          <button
            onClick={() => handleRename(chat.id)}
            className={cn(
              "bg-gradient-to-r from-transparent from-0% to-zinc-300 to-30% pl-3 py-1",
              selected && "to-zinc-200"
            )}
          >
            <ArrowDownToLine />
          </button>
        ) : (
          <div
            className={cn(
              "bg-gradient-to-r from-transparent from-0% to-zinc-300 to-30% space-x-2 flex pl-6 py-1",
              selected && "to-zinc-200"
            )}
          >
            <button onClick={() => setIsEditing(true)}>
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => handleDelete(chat.id)}>
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
