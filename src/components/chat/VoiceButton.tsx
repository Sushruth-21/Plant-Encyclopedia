"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, Volume2, VolumeX, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  onTranscript: (text: string) => void;
  isProcessing: boolean;
  latestAiResponse: string | null;
  onSpeechStarted?: () => void;
}

export default function VoiceButton({ onTranscript, isProcessing, latestAiResponse, onSpeechStarted }: Props) {
  const { languageCode } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMicSupport, setHasMicSupport] = useState(false);
  const [hasTTSSupport, setHasTTSSupport] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const chromeResumeRef = useRef<NodeJS.Timeout | null>(null);

  // ── Initialize Speech APIs (separately) ──
  useEffect(() => {
    if (typeof window === "undefined") return;

    // TTS support (most browsers have this)
    if ("speechSynthesis" in window) {
      setHasTTSSupport(true);
      synthRef.current = window.speechSynthesis;

      // Voices load async in Chrome — wait for them
      const loadVoices = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices.length > 0) {
          setVoicesReady(true);
        }
      };
      
      loadVoices(); // Try immediately (works in Firefox)
      
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = loadVoices;
      }
      
      // Fallback: check again after 500ms
      setTimeout(loadVoices, 500);
    }

    // STT support (Chrome/Edge only)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setHasMicSupport(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = languageCode;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        onTranscript(transcript);
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      recognition.onerror = (event: any) => {
        if (event.error !== "no-speech") {
          setError(event.error);
        }
        setIsListening(false);
      };

      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.abort();
      synthRef.current?.cancel();
      if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);
    };
  }, [languageCode, onTranscript]);

  // ── Speak function ──
  const speakText = useCallback((text: string) => {
    if (!synthRef.current || isMuted) return;

    // Cancel any current speech
    synthRef.current.cancel();
    if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);

    // Strip markdown for cleaner speech
    const cleanText = text
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/[#*_~`>\[\]()!|]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) return;

    // Small delay for Chrome to reset after cancel
    setTimeout(() => {
      if (!synthRef.current) return;

      const utterance = new SpeechSynthesisUtterance(cleanText);

      // Select the best available voice
      const voices = synthRef.current.getVoices();
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
      utterance.rate = 0.95; // Slightly slower for clarity

      utterance.onstart = () => {
        setIsSpeaking(true);
        onSpeechStarted?.();
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);
      };

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('TTS error:', e.error);
        }
        setIsSpeaking(false);
        if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);
      };

      synthRef.current.speak(utterance);

      // Chrome workaround: Chrome pauses speech after ~15 seconds.
      chromeResumeRef.current = setInterval(() => {
        if (synthRef.current?.speaking) {
          synthRef.current.resume();
        } else {
          if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);
        }
      }, 10000);
    }, 100);
  }, [isMuted, languageCode, onSpeechStarted]);

  // ── Auto-speak new AI responses ──
  useEffect(() => {
    if (latestAiResponse && hasTTSSupport && !isMuted && !isProcessing) {
      speakText(latestAiResponse);
    }
  }, [latestAiResponse, hasTTSSupport, isMuted, isProcessing, speakText]);

  const toggleListening = () => {
    if (!hasMicSupport) return;

    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      // Stop speaking if currently speaking
      if (isSpeaking && synthRef.current) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
      setError(null);
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (err) {
        console.error("Speech recognition start failed", err);
      }
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
    if (chromeResumeRef.current) clearInterval(chromeResumeRef.current);
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (newMuted && isSpeaking) {
      stopSpeaking();
    }
  };

  // Don't render if neither TTS nor STT is available
  if (!hasTTSSupport && !hasMicSupport) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {/* Mute/Unmute button — always shown if TTS is supported */}
      {hasTTSSupport && (
        <button
          type="button"
          onClick={toggleMute}
          className={`p-2 rounded-full transition-colors ${
            isMuted 
              ? "text-red-400 bg-red-400/10 hover:bg-red-400/20" 
              : "text-green-400 bg-green-400/10 hover:bg-green-400/20"
          }`}
          title={isMuted ? "🔇 Voice is OFF — click to enable" : "🔊 Voice is ON — AI will read responses"}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* Main Action Button */}
      {isSpeaking ? (
        <button
          type="button"
          onClick={stopSpeaking}
          className="p-2 rounded-full bg-red-400/20 text-red-400 hover:bg-red-400/30 transition-colors animate-pulse"
          title="Stop reading"
        >
          <Square className="w-4 h-4" />
        </button>
      ) : hasMicSupport ? (
        <button
          type="button"
          onClick={toggleListening}
          disabled={isProcessing}
          className={`p-2 rounded-full transition-all duration-300 ${
            isListening
              ? "bg-red-400 text-white animate-pulse shadow-[0_0_15px_rgba(248,113,113,0.5)] scale-110"
              : isProcessing
              ? "bg-[var(--bg-tertiary)] text-[var(--text-muted)] opacity-50"
              : "bg-green-400/20 text-green-400 hover:bg-green-400 hover:text-white"
          }`}
          title={isListening ? "Listening... click to stop" : "Use voice to ask"}
        >
          {isListening ? (
            <div className="relative w-4 h-4 flex items-center justify-center">
              <span className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-75 animate-ping"></span>
              <Mic className="w-4 h-4 relative z-10" />
            </div>
          ) : isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </button>
      ) : null}

      {error && (
        <span className="text-[0.6rem] text-red-400 absolute bottom-[-15px] right-0 whitespace-nowrap">
          {error === 'not-allowed' ? 'Mic access denied' : 'Error hearing you'}
        </span>
      )}
    </div>
  );
}
