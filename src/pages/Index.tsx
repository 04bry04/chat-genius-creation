
import React from 'react';
import AiChat from '@/components/AiChat';
import ApiKeyInput from '@/components/ApiKeyInput';

const Index = () => {
  return (
    <div className="py-6 px-4 sm:px-6 md:px-8 min-h-[calc(100vh-4rem)]">
      <div className="container-slim">
        <div className="mb-8 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">Experience</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Gemini Flash Chat
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Interact with Google's powerful Gemini AI model in a modern, intuitive interface.
          </p>
        </div>
        
        <ApiKeyInput />
        
        <div className="glass-panel p-4 sm:p-6">
          <AiChat />
        </div>
      </div>
    </div>
  );
};

export default Index;
