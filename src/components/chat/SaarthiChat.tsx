'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Sparkles, Send, X, ChevronDown, User } from 'lucide-react';
import { useNutrition } from '../../context/NutritionContext';

export const SaarthiChat: React.FC = () => {
  const { isChatOpen, setIsChatOpen, chatMessages, sendChatMessage, user, profile } = useNutrition();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Can I eat rice for dinner?',
    'High-protein Indian breakfast under ₹75',
    'What can I eat after my workout?',
    'Suggest a healthy alternative to samosa',
    'How to optimize my ₹1,800/week budget?',
  ];

  useEffect(() => {
    if (isChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen, isTyping]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || inputValue;
    if (!textToSend.trim()) return;

    setInputValue('');
    setIsTyping(true);

    try {
      await sendChatMessage(textToSend);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Orb Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label="Open Saarthi AI Chat"
          className="relative group p-4 rounded-full bg-gradient-to-r from-primary-900 via-primary-800 to-gold-600 border border-gold-400/50 shadow-luxury-lg hover:shadow-gold-glow transition-all duration-300 transform hover:scale-105 flex items-center justify-center cursor-pointer"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-gold-400 opacity-30 group-hover:opacity-60 blur-md animate-pulse-glow" />
          
          <div className="relative flex items-center justify-center">
            {isChatOpen ? (
              <ChevronDown className="w-6 h-6 text-white stroke-[2.5]" />
            ) : (
              <>
                <Bot className="w-6 h-6 text-gold-200 stroke-[2.5]" />
                <Sparkles className="w-3.5 h-3.5 text-gold-300 absolute -top-1 -right-1 animate-ping" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* Slide-Up Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-[#FAF7F2] border border-gold-600/35 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-white border-b border-surface-200 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary-800 to-gold-600 p-0.5 shadow-sm">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-800" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-serif text-sm font-bold text-primary-950">Saarthi AI Nutritionist</h3>
                  <span className="text-[9px] font-bold text-primary-800 bg-primary-50 px-1.5 py-0.2 rounded border border-primary-200">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-primary-900/60 font-medium">
                  Calibrated for {user.name.split(' ')[0]} ({profile.dailyCalories} kcal • {profile.proteinG}g protein)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-lg bg-surface-100 text-primary-900/60 hover:text-primary-950 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
            {chatMessages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-sm ${
                      isUser
                        ? 'bg-gold-100 text-gold-800 border border-gold-300'
                        : 'bg-primary-100 text-primary-800 border border-primary-300'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-gradient-to-r from-primary-900 to-primary-800 text-gold-100 font-medium rounded-tr-none border border-gold-500/30'
                        : 'bg-white text-primary-950 border border-gold-500/20 rounded-tl-none prose prose-xs'
                    }`}
                  >
                    {/* Render message markdown/text */}
                    <div className="whitespace-pre-line">
                      {msg.content}
                    </div>

                    <div
                      className={`text-[9px] mt-1.5 flex items-center justify-end font-medium ${
                        isUser ? 'text-gold-300/80' : 'text-primary-900/50'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-primary-900 bg-white p-3 rounded-2xl border border-gold-500/20 shadow-sm w-fit">
                <div className="spinner-border spinner-border-sm" />
                <span className="font-medium">Saarthi is analyzing nutrition data...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-surface-100/70 border-t border-surface-200 overflow-x-auto flex gap-1.5 custom-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1 rounded-full bg-white hover:bg-gold-50 border border-gold-500/25 text-[10px] text-primary-950 hover:text-gold-800 font-medium transition shadow-sm"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-white border-t border-surface-200 shadow-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask Saarthi about meals, budget, macros..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 bg-surface-100 border border-surface-300 rounded-xl px-3.5 py-2.5 text-xs text-primary-950 placeholder-primary-900/40 focus:outline-none focus:border-gold-600 transition"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-gradient-to-r from-primary-900 to-primary-800 hover:from-primary-800 disabled:opacity-40 text-gold-200 font-bold transition shadow-luxury-sm flex items-center justify-center shrink-0 border border-gold-500/30 cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      )}
    </>
  );
};
