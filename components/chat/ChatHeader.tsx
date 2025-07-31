import { Button } from "@/components/ui/button";
import { Bot, Trash2, MoreVertical, Bell } from "lucide-react";
import { ChatHeaderProps } from "@/types/chat";

export function ChatHeader({ onClear, isOnline = true }: ChatHeaderProps) {
  return (
    <div className="bg-purple-600 text-white p-3 sm:p-4 flex items-center justify-between">
      <div className="flex items-center space-x-2 sm:space-x-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-700 rounded-full flex items-center justify-center">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
        <div>
          <h2 className="font-semibold text-sm sm:text-base">AI Assistant</h2>
          <div className="flex items-center space-x-2">
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              isOnline ? 'bg-green-400' : 'bg-gray-400'
            }`}></div>
            <p className="text-xs opacity-90">{isOnline ? 'Online' : 'Offline'}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-purple-700 p-1 sm:p-2" 
          onClick={onClear}
          title="대화 기록 삭제"
        >
          <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-purple-700 p-1 sm:p-2"
          title="알림"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-white hover:bg-purple-700 p-1 sm:p-2"
          title="더보기"
        >
          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>
    </div>
  );
} 