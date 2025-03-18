
import React from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Bot, Sparkles, Cpu, Zap, Lock } from 'lucide-react';

const About = () => {
  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 min-h-[calc(100vh-4rem)] animate-fade-in">
      <div className="container-slim">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-2 uppercase tracking-wider">About</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Gemini Flash AI
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A powerful AI assistant powered by Google's cutting-edge Gemini AI technology.
          </p>
        </div>
        
        <div className="grid gap-6 md:gap-8">
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              What is Gemini Flash?
            </h2>
            <Card className="p-4 md:p-6">
              <p className="text-muted-foreground">
                Gemini Flash is an AI assistant that leverages Google's latest large language model 
                technology to provide intelligent, helpful, and creative responses to your queries. 
                With state-of-the-art natural language understanding and generation capabilities, it
                can assist with a wide range of tasks, from answering questions to generating content,
                all with remarkable speed and accuracy.
              </p>
            </Card>
          </section>
          
          <Separator />
          
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              Features
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard
                icon={<Zap className="h-5 w-5" />}
                title="Real-time Conversation"
                description="Engage in natural, flowing conversations with immediate responses."
              />
              <FeatureCard
                icon={<Cpu className="h-5 w-5" />}
                title="Advanced AI Capabilities"
                description="Powered by Google's state-of-the-art Gemini multimodal model."
              />
              <FeatureCard
                icon={<Lock className="h-5 w-5" />}
                title="Privacy-Focused"
                description="Your conversations are not stored permanently and privacy is a priority."
              />
              <FeatureCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Creative Generation"
                description="Generate content, ideas, and creative text formats with AI assistance."
              />
            </div>
          </section>
          
          <Separator />
          
          <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Bot className="mr-2 h-5 w-5" />
              Technology
            </h2>
            <Card className="p-4 md:p-6">
              <p className="text-muted-foreground">
                This application is built using modern web technologies including React, 
                TypeScript, and Tailwind CSS. The AI functionality is powered by Google's 
                Gemini API, which offers advanced language understanding and generation capabilities.
                The user interface is designed with a focus on simplicity, usability, and elegance,
                following minimalist design principles.
              </p>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="p-4 md:p-6 hover:shadow-md transition-all duration-300 border-slate-200/80">
      <div className="flex items-start">
        <div className="mr-4 mt-1 p-2 bg-primary/5 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default About;
