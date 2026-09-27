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
          className="relative group p-4 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-glow-md hover:shadow-glow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center"
        >
          {/* Animated pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-40 group-hover:opacity-75 blur-md animate-pulse-glow" />
          
          <div className="relative flex items-center justify-center">
            {isChatOpen ? (
              <ChevronDown className="w-7 h-7 text-slate-950 stroke-[2.5]" />
            ) : (
              <>
                <Bot className="w-7 h-7 text-slate-950 stroke-[2.5]" />
                <Sparkles className="w-3.5 h-3.5 text-white absolute -top-1 -right-1 animate-ping" />
              </>
            )}
          </div>
        </button>
      </div>

      {/* Slide-Up Chat Window */}
      {isChatOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[82vh] bg-surface-DEFAULT/95 border border-emerald-500/30 rounded-3xl shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
          
          {/* Header */}
          <div className="p-4 bg-surface-100/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shadow-glow-sm">
                <div className="w-full h-full bg-surface rounded-[10px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">Saarthi AI</h3>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  Calibrated for {user.name.split(' ')[0]} ({profile.dailyCalories} kcal • {profile.proteinG}g protein)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-lg bg-surface-200 text-slate-400 hover:text-white transition"
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
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}
                  >
                    {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isUser
                        ? 'bg-emerald-500 text-slate-950 font-medium rounded-tr-none'
                        : 'bg-surface-100/90 text-slate-200 border border-slate-800 rounded-tl-none prose prose-invert prose-xs'
                    }`}
                  >
                    {/* Render message markdown/text */}
                    <div className="whitespace-pre-line">
                      {msg.content}
                    </div>

                    <div
                      className={`text-[9px] mt-1.5 flex items-center justify-end ${
                        isUser ? 'text-slate-900/70 font-semibold' : 'text-slate-500'
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-surface-100/60 p-3 rounded-2xl border border-slate-800/80 w-fit">
                <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
                <span>Saarthi is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-3 py-2 bg-surface-200/50 border-t border-slate-800/80 overflow-x-auto flex gap-1.5 custom-scrollbar">
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-surface-100 hover:bg-slate-800 border border-slate-700/60 text-[10px] text-slate-300 hover:text-emerald-300 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Message Input Box */}
          <div className="p-3 bg-surface-100/90 border-t border-slate-800">
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
                className="flex-1 bg-surface-200 border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-slate-950 font-bold transition shadow-glow-sm flex items-center justify-center shrink-0"
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
