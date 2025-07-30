import { streamText } from "ai";
import { Message } from "ai";
import { openai } from '@ai-sdk/openai';

// Edge 런타임 설정
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json() as { messages: Message[] };

    // 시스템 메시지 확인 및 추가
    const hasSystemMessage = messages.some(
      (message) => message.role === "system"
    );
    
    const finalMessages = hasSystemMessage
      ? messages
      : [
          { role: "system", content: "You are a helpful assistant." } as Message,
          ...messages,
        ];

    const response = await streamText({
      model: openai('gpt-4o-mini'),
      messages: finalMessages,
      temperature: 0.7,
      maxTokens: 1000,
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API 오류:", error);
    return new Response(
      JSON.stringify({ error: "요청 처리 중 오류가 발생했습니다." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
} 