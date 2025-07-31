import { useCallback } from "react";
import { CHAT_CONSTANTS } from "@/constants/chat";
import { ChatMessage } from "@/types/chat";

export function useChatStorage() {
  const getInitialMessages = useCallback((): ChatMessage[] => {
    if (typeof window === "undefined") return [];
    
    try {
      const stored = localStorage.getItem(CHAT_CONSTANTS.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("로컬 스토리지에서 메시지를 불러오는 중 오류:", error);
      return [];
    }
  }, []);

  const saveMessages = useCallback((messages: ChatMessage[]) => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.setItem(CHAT_CONSTANTS.STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("로컬 스토리지에 메시지를 저장하는 중 오류:", error);
    }
  }, []);

  const clearMessages = useCallback(() => {
    if (typeof window === "undefined") return;
    
    try {
      localStorage.removeItem(CHAT_CONSTANTS.STORAGE_KEY);
    } catch (error) {
      console.error("로컬 스토리지에서 메시지를 삭제하는 중 오류:", error);
    }
  }, []);

  return { getInitialMessages, saveMessages, clearMessages };
} 