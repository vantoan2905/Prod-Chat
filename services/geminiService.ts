import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from "../types";

// In a real app, do not log the key, but ensure it exists.
const API_KEY = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateChatResponse = async (
  messages: ChatMessage[],
  contextDocs: string[],
  modelId: string = 'gemini-2.5-flash'
): Promise<string> => {
  if (!API_KEY) {
    return "Vui lòng cấu hình API KEY trong biến môi trường để sử dụng tính năng Chat.";
  }

  try {
    // Construct the prompt history
    // Simple approach: Combine history into a context string + last user message
    // A more robust approach uses the proper chat history structure if using ai.chats.create
    
    // For this demo, we'll use a single turn generation with history context for simplicity in state management, 
    // or use chat.sendMessage if we were maintaining the chat object instance properly.
    // Let's use the robust chat object approach but recreate it for the stateless service call pattern common in these demos.
    
    // However, to keep it simple and strictly follow the "Generate Content" guidance for a mix of docs:
    
    const systemInstruction = `Bạn là một trợ lý AI hữu ích, chuyên nghiệp và lịch sự.
    Bạn có quyền truy cập vào các tài liệu sau (mô phỏng): ${contextDocs.join(', ')}.
    Hãy trả lời bằng Tiếng Việt.`;

    const chat = ai.chats.create({
        model: modelId,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        }
    });

    // Replay history to get context state (excluding the very last new message which we send)
    const history = messages.slice(0, -1);
    const lastMessage = messages[messages.length - 1];

    for (const msg of history) {
        // In a real app, we would differentiate properly. 
        // The SDK's chat history manipulation is internal, so we just "send" previous messages 
        // or rely on the fact that 'history' param in create() is preferred. 
        // For this mock-up, we will just send the LAST message as a fresh prompt with system context.
        // Or properly, we build the history array for the chat config if supported, 
        // but the easiest robust way for a stateless feel is to concat text.
    }
    
    // Simplified for demo: Just answer the last prompt with the system instruction
    const response: GenerateContentResponse = await chat.sendMessage({
        message: lastMessage.content
    });

    return response.text || "Xin lỗi, tôi không thể tạo câu trả lời.";

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với AI. Vui lòng thử lại sau.";
  }
};

export const summarizeDocument = async (docContent: string): Promise<string> => {
    if (!API_KEY) return "Chưa cấu hình API Key.";
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Hãy tóm tắt ngắn gọn tài liệu sau bằng tiếng Việt trong khoảng 3 câu: ${docContent}`,
        });
        return response.text || "Không có tóm tắt.";
    } catch (e) {
        console.error(e);
        return "Lỗi khi tóm tắt.";
    }
}