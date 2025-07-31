import { Message } from "ai/react";

export interface ChatMessage extends Message {
  timestamp?: Date;
}

export interface ChatProps {
  className?: string;
  onMessageSend?: (message: string) => void;
  onClear?: () => void;
}

export interface MessageBubbleProps {
  message: ChatMessage;
  formatTime: (date: Date) => string;
}

export interface ChatHeaderProps {
  onClear: () => void;
  isOnline?: boolean;
}

export interface MessageInputProps {
  input: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export interface TypingIndicatorProps {
  isTyping: boolean;
}

export type MessageRole = 'user' | 'assistant';

export interface ChatStorage {
  getInitialMessages: () => ChatMessage[];
  saveMessages: (messages: ChatMessage[]) => void;
  clearMessages: () => void;
} 