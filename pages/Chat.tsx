import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Bot, User, FileText, Sparkles, Trash2 } from 'lucide-react';
import { ChatMessage, Document } from '../types';
import { MOCK_DOCUMENTS, SUGGESTED_QUERIES } from '../constants';
import { generateChatResponse } from '../services/geminiService';
import { useLocation } from 'react-router-dom';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      role: 'model',
      content: 'Xin chào! Tôi là trợ lý AI riêng tư của bạn. Hãy kéo thả tài liệu vào đây hoặc hỏi tôi bất cứ điều gì về các file bạn đã tải lên.',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextDocs, setContextDocs] = useState<Document[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle URL param for pre-selecting a doc
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const docId = params.get('doc');
    if (docId) {
        const doc = MOCK_DOCUMENTS.find(d => d.id === docId);
        if (doc && !contextDocs.find(d => d.id === doc.id)) {
            setContextDocs(prev => [...prev, doc]);
        }
    }
  }, [location.search, contextDocs]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim() && contextDocs.length === 0) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now(),
      relatedDocs: contextDocs.map(d => d.id)
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      const docContext = contextDocs.map(d => `Tài liệu: ${d.name}\nTóm tắt: ${d.summary}\nNội dung: ${d.content}`);
      const responseText = await generateChatResponse(
          [...messages, userMsg], 
          docContext
      );

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
       console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const removeDoc = (id: string) => {
      setContextDocs(prev => prev.filter(d => d.id !== id));
  };

  // Drag and Drop simulation
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      // Simulate adding a random doc from mock if not exists
      const randomDoc = MOCK_DOCUMENTS[Math.floor(Math.random() * MOCK_DOCUMENTS.length)];
      if (!contextDocs.find(d => d.id === randomDoc.id)) {
          setContextDocs(prev => [...prev, randomDoc]);
      }
  };

  return (
    <div className="flex h-screen bg-white">
      
      {/* Main Chat Area */}
      <div 
        className={`flex-1 flex flex-col relative ${isDragging ? 'bg-blue-50' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {isDragging && (
            <div className="absolute inset-0 flex items-center justify-center bg-blue-50/90 z-50 border-4 border-dashed border-blue-300 m-4 rounded-xl">
                <div className="text-center text-blue-600">
                    <UploadCloudIcon className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-xl font-semibold">Thả tài liệu vào đây để phân tích</p>
                </div>
            </div>
        )}

        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <Sparkles className="text-yellow-500" size={18} />
                Trợ lý AI
            </h2>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Gemini 2.5 Flash</div>
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-800 text-white' : 'bg-blue-600 text-white'}`}>
                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={`max-w-[70%] space-y-1`}>
                <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-gray-800 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                }`}>
                  {msg.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-1">{line}</p>
                  ))}
                </div>
                {msg.role === 'model' && (
                  <p className="text-xs text-gray-400 ml-2">Được tạo bởi AI</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot size={16} className="text-white" />
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Context Docs Bar (if any) */}
        {contextDocs.length > 0 && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex gap-2 overflow-x-auto">
                {contextDocs.map(doc => (
                    <div key={doc.id} className="flex items-center gap-2 bg-white border border-gray-200 pl-2 pr-1 py-1 rounded-md text-xs shadow-sm flex-shrink-0">
                        <FileText size={12} className="text-blue-500" />
                        <span className="max-w-[100px] truncate">{doc.name}</span>
                        <button onClick={() => removeDoc(doc.id)} className="hover:text-red-500"><Trash2 size={12} /></button>
                    </div>
                ))}
            </div>
        )}

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-end gap-2 bg-gray-50 p-2 rounded-xl border border-gray-200 focus-within:ring-2 focus-within:ring-gray-200 focus-within:border-gray-400 transition-all">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors" title="Đính kèm file">
              <Paperclip size={20} />
            </button>
            <textarea
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 text-sm py-2"
              placeholder="Nhập tin nhắn..."
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="p-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2">AI có thể mắc lỗi. Vui lòng kiểm tra thông tin quan trọng.</p>
        </div>
      </div>

      {/* Right Sidebar - Context & History */}
      <div className="w-80 border-l border-gray-200 bg-gray-50 hidden xl:flex flex-col">
        <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">Thông tin bổ trợ</div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Suggested Queries */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Gợi ý câu hỏi</h3>
            <div className="space-y-2">
              {SUGGESTED_QUERIES.map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => setInputValue(q)}
                  className="w-full text-left p-3 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:shadow-sm transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Docs in use */}
          <div>
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tài liệu tham chiếu</h3>
            {contextDocs.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm border-2 border-dashed border-gray-200 rounded-lg">
                    Chưa có tài liệu nào
                </div>
            ) : (
                <div className="space-y-2">
                    {contextDocs.map(doc => (
                        <div key={doc.id} className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm">
                            <div className="flex items-center gap-2 mb-1">
                                <FileText size={14} className="text-blue-500" />
                                <span className="text-sm font-medium text-gray-800 truncate">{doc.name}</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">{doc.summary}</p>
                        </div>
                    ))}
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadCloudIcon = ({ className }: {className?: string}) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
        <path d="M12 12v9"></path>
        <path d="m16 16-4-4-4 4"></path>
    </svg>
)

export default Chat;