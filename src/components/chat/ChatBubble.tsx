"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "ai/react";
import { MessageCircle, X, Send, Bot, User, Trash2, Volume2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import VoiceButton from "./VoiceButton";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/context/translations";

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, languageCode } = useLanguage();
  const pathname = usePathname();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [lastSpokenId, setLastSpokenId] = useState<string | null>("1");
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  
  // Build plant context safely (only on the client side)
  const [plantContext, setPlantContext] = useState("");
  useEffect(() => {
    if (pathname.includes("/plant/")) {
      const h1 = document.querySelector("h1");
      if (h1) {
        setPlantContext(`User is currently viewing the plant "${h1.innerText}".`);
      }
    } else {
      setPlantContext("");
    }
  }, [pathname]);

  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages, append } = useChat({
    api: "/api/chat",
    body: {
      plantContext,
      language
    },
    onError: (err) => {
      console.error(err);
    },
    initialMessages: [
      { id: "1", role: "assistant", content: "Hi! I'm the FloraBase AI 🌿 Ask me anything about plants, care, diseases, or gardening tips!" }
    ]
  });

  // Scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle voice transcript
  const handleTranscript = (text: string) => {
    if (!text.trim()) return;
    append({ role: 'user', content: text });
  };

  // ── Read Aloud (manual, user-gesture-triggered) ──
  const readAloud = useCallback((text: string, messageId: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    const synth = window.speechSynthesis;
    synth.cancel(); // Stop any current speech
    
    // Strip markdown
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/[#*_~`>\[\]()!|]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
    
    if (!cleanText) return;
    
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    // Select best voice
    const voices = synth.getVoices();
    const localeMatch = languageCode.split('-')[0];
    
    const voice = 
      voices.find(v => v.lang.startsWith(localeMatch) && /Natural|Online|Neural/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith(localeMatch) && /Google/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith(localeMatch)) ||
      voices.find(v => v.lang.startsWith('en') && /Natural|Google|Neural/i.test(v.name)) ||
      voices.find(v => v.lang.startsWith('en'));
    
    if (voice) {
      utterance.voice = voice;
      utterance.lang = voice.lang;
    }
    
    utterance.pitch = 1.0;
    utterance.rate = 0.95;
    
    utterance.onstart = () => setSpeakingId(messageId);
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);
    
    synth.speak(utterance);
    
    // Chrome workaround for long texts
    const interval = setInterval(() => {
      if (synth.speaking) {
        synth.resume();
      } else {
        clearInterval(interval);
      }
    }, 10000);
    
    utterance.onend = () => {
      clearInterval(interval);
      setSpeakingId(null);
    };
  }, [languageCode]);

  const stopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
  };

  // Get the latest complete response for the VoiceButton auto-speak
  const latestAssistantMessage = [...messages].reverse().find(m => m.role === 'assistant' && !isLoading);
  const latestAiResponse = (latestAssistantMessage && latestAssistantMessage.id !== lastSpokenId) ? latestAssistantMessage.content : null;

  const handleSpeechStarted = () => {
    if (latestAssistantMessage) {
      setLastSpokenId(latestAssistantMessage.id);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-[var(--bg-primary)] shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300 ${isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--accent-gold)] rounded-full animate-pulse"></span>
      </button>

      {/* Chat Interface */}
      <div
        className={`fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] flex flex-col bg-[var(--bg-secondary)] border border-[var(--border-subtle)] rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right overflow-hidden ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-[var(--border-subtle)] bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)]" style={{ fontFamily: "var(--font-heading)" }}>Flora AI</h3>
              <p className="text-[0.65rem] text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Online
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMessages(messages.slice(0, 1))}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-red-400 transition-colors"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 max-w-[90%] ${message.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  message.role === "user" ? "bg-[var(--bg-tertiary)]" : "bg-green-500/20"
                }`}
              >
                {message.role === "user" ? (
                  <User className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                ) : (
                  <Bot className="w-3.5 h-3.5 text-green-400" />
                )}
              </div>
              <div className="flex flex-col gap-1">
                <div
                  className={`p-3 rounded-2xl text-sm ${
                    message.role === "user"
                      ? "bg-[var(--bg-tertiary)] text-[var(--text-primary)] rounded-tr-sm"
                      : "bg-green-500/10 text-[var(--text-primary)] border border-green-500/20 rounded-tl-sm prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-a:text-green-400 max-w-none"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <ReactMarkdown>{message.content}</ReactMarkdown>
                  ) : (
                    message.content
                  )}
                </div>
                
                {/* Read Aloud button for AI messages */}
                {message.role === "assistant" && message.id !== "1" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (speakingId === message.id) {
                        stopSpeaking();
                      } else {
                        readAloud(message.content, message.id);
                      }
                    }}
                    className={`self-start flex items-center gap-1 px-2 py-0.5 rounded-full text-[0.6rem] transition-all ${
                      speakingId === message.id
                        ? "bg-green-400/20 text-green-400 animate-pulse"
                        : "text-[var(--text-muted)] hover:text-green-400 hover:bg-green-400/10"
                    }`}
                    title={speakingId === message.id ? "Stop reading" : "Read aloud"}
                  >
                    <Volume2 className="w-3 h-3" />
                    {speakingId === message.id ? "Speaking..." : "Read aloud"}
                  </button>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3 max-w-[90%] mr-auto">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-green-400" />
              </div>
              <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/20 rounded-tl-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-[var(--bg-secondary)] border-t border-[var(--border-subtle)] relative">
          <form onSubmit={handleSubmit} className="flex items-end gap-2">
            <div className="flex-1 bg-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-subtle)] overflow-hidden focus-within:border-green-500/50 transition-colors">
              <textarea
                value={input}
                onChange={handleInputChange}
                disabled={isLoading}
                placeholder={translations[language]?.searchPlaceholder || "Ask about plants..."}
                className="w-full bg-transparent p-3 text-sm resize-none outline-none max-h-32 min-h-[44px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    if (input.trim() && !isLoading) {
                      handleSubmit();
                    }
                  }
                }}
              />
            </div>
            
            <div className="flex flex-col items-center justify-between gap-1 pb-1">
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 rounded-full bg-green-400 text-black disabled:opacity-30 disabled:cursor-not-allowed hover:bg-green-300 transition-colors"
              >
                <Send className="w-4 h-4 translate-x-0.5 -translate-y-0.5" />
              </button>
              
              <VoiceButton 
                onTranscript={handleTranscript} 
                isProcessing={isLoading} 
                latestAiResponse={latestAiResponse}
                onSpeechStarted={handleSpeechStarted}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
