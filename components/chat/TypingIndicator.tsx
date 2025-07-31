import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { TypingIndicatorProps } from "@/types/chat";
import { CHAT_CONSTANTS } from "@/constants/chat";

export function TypingIndicator({ isTyping }: TypingIndicatorProps) {
  if (!isTyping) return null;

  return (
    <div className="flex gap-2 sm:gap-3 justify-start">
      <div className="flex gap-2 sm:gap-3">
        <Avatar className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
          <AvatarFallback className="bg-gray-200">
            <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
          </AvatarFallback>
        </Avatar>
        <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-gray-100">
          <div className="flex space-x-1">
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"
            ></div>
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" 
              style={{ animationDelay: `${CHAT_CONSTANTS.ANIMATION_DELAYS.SECOND}ms` }}
            ></div>
            <div 
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" 
              style={{ animationDelay: `${CHAT_CONSTANTS.ANIMATION_DELAYS.THIRD}ms` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
} 