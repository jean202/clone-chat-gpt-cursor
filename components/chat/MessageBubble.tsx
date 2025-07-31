import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, CheckCheck } from "lucide-react";
import { MessageBubbleProps } from "@/types/chat";
import { useState, useEffect } from "react";

export function MessageBubble({ message, formatTime }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <div
      className={`flex gap-2 sm:gap-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[70%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <Avatar className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
          {isUser ? (
            <AvatarFallback className="bg-purple-600">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </AvatarFallback>
          ) : (
            <AvatarFallback className="bg-gray-200">
              <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
            </AvatarFallback>
          )}
        </Avatar>

        {/* Message Bubble */}
        <div
          className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
            isUser
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-900"
          }`}
        >
          <p className="whitespace-pre-wrap text-sm">{message.content}</p>
          <div className={`flex items-center justify-between mt-1 ${
            isUser ? "text-purple-100" : "text-gray-500"
          }`}>
            <span className="text-xs">
              {mounted ? formatTime(new Date()) : '--:--'}
            </span>
            {isUser && (
              <div className="flex items-center space-x-1">
                <CheckCheck className="h-3 w-3" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 