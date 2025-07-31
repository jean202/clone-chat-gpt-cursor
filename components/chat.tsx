"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useChat, type Message } from "ai/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useChatStorage } from "@/hooks/useChatStorage";
import { CHAT_CONSTANTS } from "@/constants/chat";
import { ChatMessage } from "@/types/chat";
import { ChatHeader } from "@/components/chat/ChatHeader";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { MessageInput } from "@/components/chat/MessageInput";
import { TypingIndicator } from "@/components/chat/TypingIndicator";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export function Chat() {
  const [isTyping, setIsTyping] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { getInitialMessages, saveMessages, clearMessages } = useChatStorage();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chat = useChat({
    api: "/api/chat",
    initialMessages: getInitialMessages(),
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = chat;

  // Hydration 에러 방지를 위한 마운트 체크
  useEffect(() => {
    setMounted(true);
  }, []);

  // 메시지가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (mounted) {
      saveMessages(messages as ChatMessage[]);
    }
  }, [messages, saveMessages, mounted]);

  // 대화 기록 삭제 함수
  const clearChat = useCallback(() => {
    setMessages([]);
    clearMessages();
  }, [setMessages, clearMessages]);

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTyping(true);
    try {
      await handleSubmit(e);
    } finally {
      setIsTyping(false);
    }
  }, [handleSubmit]);

  const formatTime = useCallback((date: Date) => {
    return date.toLocaleTimeString('ko-KR', CHAT_CONSTANTS.TIME_FORMAT);
  }, []);

  // 서버 사이드 렌더링 시 안전한 렌더링
  if (!mounted) {
    return (
      <div className="flex h-screen bg-gray-50">
        <div className="flex-1 flex flex-col bg-white">
          <div className="bg-purple-600 text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-700 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <div>
                <h2 className="font-semibold text-sm sm:text-base">AI Assistant</h2>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <p className="text-lg sm:text-xl font-medium">AI Assistant</p>
              <p className="text-sm mt-2 text-gray-400">로딩 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="flex h-screen bg-gray-50">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Chat Header */}
          <ChatHeader onClear={clearChat} />

          {/* Messages Area */}
          <ScrollArea className="flex-1 p-2 sm:p-4">
            <div className="space-y-3 sm:space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <p className="text-lg sm:text-xl font-medium">AI Assistant</p>
                  <p className="text-sm mt-2 text-gray-400">무엇을 도와드릴까요?</p>
                </div>
              )}
              
              {messages.map((message) => (
                <MessageBubble 
                  key={message.id} 
                  message={message as ChatMessage} 
                  formatTime={formatTime} 
                />
              ))}

              {/* Typing Indicator */}
              <TypingIndicator isTyping={isTyping} />
            </div>
          </ScrollArea>

          {/* Message Input */}
          <MessageInput 
            input={input}
            onChange={handleInputChange}
            onSubmit={onSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
} 