import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Mic } from 'lucide-react';
import { generateShoppingAdvice } from '../services/geminiService';
import { ChatMessage, Product } from '../types';

interface CopilotProps {
  products: Product[];
  cart: Product[];
}

export const Copilot: React.FC<CopilotProps> = ({ products, cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello! I am Lumina. Looking for something specific or need style advice?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const advice = await generateShoppingAdvice(userMsg.text, { products, cart });

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: advice,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Trigger */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-50 p-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform duration-300 animate-pulse-slow"
        >
          <Sparkles className="text-white w-6 h-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 md:w-96 h-[500px] bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl flex flex-col shadow-2xl overflow-hidden transition-all duration-300 transform origin-bottom-right">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-purple-900/50 to-cyan-900/50">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white tracking-wider">LUMINA COPILOT</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-cyan-600/20 border border-cyan-500/30 text-cyan-50 rounded-tr-sm' 
                    : 'bg-purple-600/20 border border-purple-500/30 text-purple-50 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-purple-600/20 border border-purple-500/30 p-3 rounded-2xl rounded-tl-sm flex gap-1 items-center">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-black/40">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about style, size, or fit..."
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <div className="absolute right-2 top-2 flex gap-1">
                 <button className="p-1.5 text-gray-400 hover:text-cyan-400 transition-colors">
                    <Mic className="w-4 h-4" />
                 </button>
                 <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-1.5 bg-cyan-600/80 rounded-lg text-white hover:bg-cyan-500 transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
