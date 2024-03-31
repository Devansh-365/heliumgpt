"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowBigRightDash, PlusCircle } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="relative mx-6 flex justify-center items-center">
      <div className="max-w-5xl fixed bottom-0 w-full border bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80">
        <div className="mx-auto sm:max-w-5xl sm:px-4">
          <div className="px-4 py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 mx-auto">
            <form
              className="mx-auto"
              // ref={formRef}
              // onSubmit={async (e: any) => {
              //   e.preventDefault();

              //   // Blur focus on mobile
              //   if (window.innerWidth < 600) {
              //     e.target["message"]?.blur();
              //   }

              //   const value = inputValue.trim();
              //   setInputValue("");
              //   if (!value) return;

              //   // Add user message UI
              //   setMessages((currentMessages) => [
              //     ...currentMessages,
              //     {
              //       id: Date.now(),
              //       display: <UserMessage>{value}</UserMessage>,
              //     },
              //   ]);

              //   try {
              //     // Submit and get response message
              //     const responseMessage = await submitUserMessage(value);
              //     setMessages((currentMessages) => [
              //       ...currentMessages,
              //       responseMessage,
              //     ]);
              //   } catch (error) {
              //     // You may want to show a toast or trigger an error state.
              //     console.error(error);
              //   }
              // }}
            >
              <div className="relative flex flex-col w-full px-8 overflow-hidden max-h-60 grow bg-background sm:rounded-md sm:border sm:px-12">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-0 w-8 h-8 p-0 rounded-full top-4 bg-background text-black sm:left-4"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.reload();
                        }}
                      >
                        <PlusCircle />
                        <span className="sr-only">New Chat</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>New Chat</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Textarea
                  // ref={inputRef}
                  tabIndex={0}
                  // onKeyDown={onKeyDown}
                  placeholder="Send a message."
                  className="min-h-[60px] w-full resize-none text-black bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm border-none focus:border-none"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  name="message"
                  rows={1}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <div className="absolute right-0 top-4 sm:right-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="submit"
                          size="icon"
                          disabled={inputValue === ""}
                        >
                          <ArrowBigRightDash />
                          <span className="sr-only">Send message</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Send message</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </form>
            {/* <FooterText className="hidden sm:block" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
