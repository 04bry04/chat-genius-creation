
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SendIcon, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
      
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative mt-auto bg-background/80 backdrop-blur-sm pt-4"
    >
      <div className="glass-panel overflow-hidden flex items-end">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className={cn(
            "chat-input flex-1 resize-none bg-transparent border-0 p-4 focus:ring-0 focus:outline-none",
            "placeholder:text-muted-foreground/50 text-base md:text-sm"
          )}
          disabled={isLoading}
        />
        
        <Button
          type="submit"
          size="icon"
          className={cn(
            "rounded-full h-10 w-10 mr-2 mb-2 transition-all",
            message.trim() ? "opacity-100" : "opacity-0",
            isLoading && "pointer-events-none"
          )}
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <SendIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="text-xs text-center text-muted-foreground/50 mt-2">
        Powered by Google Gemini AI
      </div>
    </form>
  );
};

export default ChatInput;
