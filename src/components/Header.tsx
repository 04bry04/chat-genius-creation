
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { MessageCircle, Info, Home } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const navLinks = [
    { 
      name: 'Home', 
      path: '/', 
      icon: <Home className="h-4 w-4 mr-1" /> 
    },
    { 
      name: 'About', 
      path: '/about', 
      icon: <Info className="h-4 w-4 mr-1" /> 
    }
  ];

  return (
    <header className="w-full py-4 px-4 sm:px-6 md:px-8 border-b border-slate-200/80 bg-white/60 backdrop-blur-md sticky top-0 z-10 transition-all duration-300">
      <div className="container-slim">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-primary font-medium transition-opacity hover:opacity-80"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-lg tracking-tight">Gemini Flash</span>
          </Link>
          
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center transition-all duration-200",
                  location.pathname === link.path
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:text-primary hover:bg-muted/50"
                )}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
