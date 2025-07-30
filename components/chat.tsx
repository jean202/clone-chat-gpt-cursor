"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useChat, type Message } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Trash2, ArrowLeft, MoreVertical, Bell, Search, Plus, Check, CheckCheck, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";

const STORAGE_KEY = "chat-messages";

export function Chat() {
  const [isTyping, setIsTyping] = useState(false);

  // 로컬 스토리지에서 초기 메시지 불러오기
  const getInitialMessages = (): Message[] => {
    if (typeof window === "undefined") return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("로컬 스토리지에서 메시지를 불러오는 중 오류:", error);
      return [];
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const chat = useChat({
    api: "/api/chat",
    initialMessages: getInitialMessages(),
  });
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } = chat;

  // 메시지가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("로컬 스토리지에 메시지를 저장하는 중 오류:", error);
    }
  }, [messages]);

  // 대화 기록 삭제 함수
  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsTyping(true);
    await handleSubmit(e);
    setIsTyping(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
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
          <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700 p-1 sm:p-2" onClick={clearChat}>
              <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700 p-1 sm:p-2">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-white hover:bg-purple-700 p-1 sm:p-2">
              <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

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
            
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex gap-2 sm:gap-3 ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-[70%] ${
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  {/* Avatar */}
                  <Avatar className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                    {message.role === "user" ? (
                      <>
                        <AvatarImage src="/user-avatar.png" />
                        <AvatarFallback className="bg-purple-600">
                          <User className="h-4 w-4 sm:h-5 sm:w-5" />
                        </AvatarFallback>
                      </>
                    ) : (
                      <>
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback className="bg-gray-200">
                          <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                        </AvatarFallback>
                      </>
                    )}
                  </Avatar>

                  {/* Message Bubble */}
                  <div
                    className={`px-3 py-2 sm:px-4 sm:py-3 rounded-2xl ${
                      message.role === "user"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                    <div className={`flex items-center justify-between mt-1 ${
                      message.role === "user" ? "text-purple-100" : "text-gray-500"
                    }`}>
                      <span className="text-xs">{formatTime(new Date())}</span>
                      {message.role === "user" && (
                        <div className="flex items-center space-x-1">
                          <CheckCheck className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2 sm:gap-3 justify-start">
                <div className="flex gap-2 sm:gap-3">
                  <Avatar className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage src="/bot-avatar.png" />
                    <AvatarFallback className="bg-gray-200">
                      <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="px-3 py-2 sm:px-4 sm:py-3 rounded-2xl bg-gray-100">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="p-2 sm:p-4 border-t border-gray-200 bg-white">
          <form onSubmit={onSubmit} className="flex gap-2 sm:gap-3 items-end">
            <div className="flex-1 relative">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type message here..."
                disabled={isLoading}
                className="pr-10 sm:pr-12 rounded-full border-gray-300 focus:border-purple-500 text-sm"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-purple-600 hover:bg-purple-700 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
            >
              <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
} 