import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUp } from "lucide-react";
import { MessageInputProps } from "@/types/chat";

export function MessageInput({ 
  input, 
  onChange, 
  onSubmit, 
  isLoading, 
  disabled = false 
}: MessageInputProps) {
  return (
    <div className="p-2 sm:p-4 border-t border-gray-200 bg-white">
      <form onSubmit={onSubmit} className="flex gap-2 sm:gap-3 items-end">
        <div className="flex-1 relative">
          <Input
            value={input}
            onChange={onChange}
            placeholder="Type message here..."
            disabled={isLoading || disabled}
            className="pr-10 sm:pr-12 rounded-full border-gray-300 focus:border-purple-500 text-sm"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim() || disabled}
          className="bg-purple-600 hover:bg-purple-700 rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0"
          title="메시지 전송"
        >
          <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </form>
    </div>
  );
} 