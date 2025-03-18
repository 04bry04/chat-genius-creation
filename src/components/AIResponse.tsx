
import React from 'react';
import { type Message } from './AiChat';
import { cn } from '@/lib/utils';
import { User, Bot } from 'lucide-react';

interface AIResponseProps {
  message: Message;
}

const AIResponse: React.FC<AIResponseProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div 
      className={cn(
        "flex items-start gap-3 px-4 py-3 rounded-xl max-w-[85%]",
        isUser 
          ? "ml-auto bg-primary text-primary-foreground" 
          : "mr-auto glass-panel"
      )}
    >
      <div className="flex-shrink-0 mt-1">
        {isUser ? (
          <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="h-3 w-3" />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="h-3 w-3" />
          </div>
        )}
      </div>
      
      <div className="min-w-0 break-words">
        <div className="prose-sm prose-neutral dark:prose-invert">
          {message.content.split('\n').map((text, i) => (
            <React.Fragment key={i}>
              {text}
              {i < message.content.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        
        <div className="text-[10px] opacity-50 mt-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default AIResponse;
