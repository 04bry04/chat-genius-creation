
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import ChatInput from './ChatInput';
import AIResponse from './AIResponse';
import { sendMessage } from '@/services/gemini';

export type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
};

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Generate a unique ID
    const userId = Date.now().toString();
    
    // Add user message
    const userMessage: Message = {
      id: userId,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Send message to AI service
      const response = await sendMessage(content, messages);
      
      // Add AI response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div 
        ref={chatContainerRef}
        className="chat-container flex-1 space-y-6 pb-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="text-primary/20">
              <MessageCircleIcon className="h-16 w-16 mb-2" />
            </div>
            <h3 className="text-xl font-medium text-primary">Start a conversation</h3>
            <p className="text-muted-foreground max-w-md mt-2">
              Ask Gemini Flash anything or try one of the examples below.
            </p>
            <div className="flex flex-wrap gap-2 mt-6 justify-center">
              {['Generate a short story about AI', 'Explain quantum computing', 'Show me a creative recipe'].map((example) => (
                <button
                  key={example}
                  onClick={() => handleSendMessage(example)}
                  className="px-3 py-2 bg-secondary rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id}
              className={`animate-slide-up opacity-0 animation-delay-${
                messages.indexOf(message) * 100
              }`}
              style={{
                animationFillMode: 'forwards',
                animationDelay: `${messages.indexOf(message) * 0.05}s`
              }}
            >
              <AIResponse message={message} />
            </div>
          ))
        )}
        
        {isLoading && (
          <div className="animate-slide-up">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <div className="w-2 h-2 rounded-full bg-current animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-current animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default AiChat;

// Add this here for the fallback content
const MessageCircleIcon = ({ className }: { className?: string }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
};
