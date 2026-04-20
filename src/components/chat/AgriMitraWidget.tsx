"use client";

import { useState, useEffect, useRef } from "react";

type WidgetState = "idle" | "loading" | "ringing" | "connected" | "ending";

export default function AgriMitraWidget() {
  const [state, setState] = useState<WidgetState>("idle");
  const [statusText, setStatusText] = useState("Connecting...");
  const [statusSub, setStatusSub] = useState("Please wait");
  const [showWaves, setShowWaves] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  const vapiRef = useRef<any>(null);
  const callActiveRef = useRef(false);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const PUBLIC_KEY = "8cc4141a-540c-426d-b7fa-51e80bd9ee50";
  const ASSISTANT_ID = "83e1c622-b273-45f0-ac20-54ff4aa395c4";

  // Initialize Vapi SDK
  useEffect(() => {
    let mounted = true;

    async function initVapi() {
      try {
        const { default: Vapi } = await import("@vapi-ai/web" as any);
        if (!mounted) return;
        const instance = new Vapi(PUBLIC_KEY);
        vapiRef.current = instance;
        console.log("AgriMitra ✅ VAPI ready");

        instance.on("call-start", () => {
          callActiveRef.current = true;
          applyState("connected", "Connected!", "Ask your farming question...", true);
        });
        instance.on("speech-start", () =>
          applyState("connected", "AgriMitra is speaking...", "Please listen", true)
        );
        instance.on("speech-end", () =>
          applyState("connected", "Listening to you...", "Speak your question", true)
        );
        instance.on("call-end", () => {
          callActiveRef.current = false;
          applyState("ending", "Call ended", "Have a great farming day! 🌱", false);
          scheduleReset();
        });
        instance.on("error", (e: any) => {
          callActiveRef.current = false;
          applyState("ending", "Error", e?.message || "Please try again", false);
          scheduleReset();
        });
      } catch (e) {
        console.error("AgriMitra ❌ Failed to load VAPI:", e);
      }
    }

    initVapi();
    return () => {
      mounted = false;
    };
  }, []);

  function applyState(s: WidgetState, text: string, sub: string, waves: boolean) {
    setState(s);
    setStatusText(text);
    setStatusSub(sub);
    setShowWaves(waves);
    setShowStatus(true);
  }

  function scheduleReset() {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      callActiveRef.current = false;
      setState("idle");
      setShowStatus(false);
      setShowWaves(false);
      setStatusText("Connecting...");
      setStatusSub("Please wait");
    }, 4000);
  }

  async function handleClick() {
    // End call if active
    if (callActiveRef.current && vapiRef.current) {
      vapiRef.current.stop();
      return;
    }

    // SDK not loaded
    if (!vapiRef.current) {
      applyState("ending", "Could not load AgriMitra", "Please refresh the page", false);
      scheduleReset();
      return;
    }

    // Start call
    applyState("ringing", "Connecting to AgriMitra...", "Please allow microphone access", false);

    try {
      await vapiRef.current.start(ASSISTANT_ID);
    } catch (err: any) {
      applyState("ending", "Could not connect", err?.message || "Please try again", false);
      scheduleReset();
    }
  }

  // Button label based on state
  let btnLabel = "Ask AgriMitra";
  if (state === "ringing") btnLabel = "Connecting...";
  else if (state === "connected") btnLabel = "Tap to End Call";
  else if (state === "ending") btnLabel = "Ending...";

  // Dot color
  let dotBg = "#56ab2f";
  if (state === "connected") dotBg = "#1976d2";
  else if (state === "ending") dotBg = "#e53935";

  return (
    <>
      {/* Widget Styles */}
      <style jsx global>{`
        #agrimitra-widget-react {
          position: fixed;
          bottom: 28px;
          left: 28px;
          z-index: 99999;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          font-family: 'Sora', sans-serif;
        }

        .agri-status-card {
          background: #fff;
          border-radius: 14px;
          padding: 14px 18px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.13);
          min-width: 230px;
          animation: agri-slide-up 0.3s ease;
        }

        @keyframes agri-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .agri-status-row {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 13px;
          font-weight: 600;
          color: #2d3748;
        }

        .agri-dot-el {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          flex-shrink: 0;
          transition: background 0.3s;
        }

        .agri-dot-el.pulse {
          animation: agri-dot-pulse 1.2s infinite;
        }

        @keyframes agri-dot-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }

        .agri-status-sub {
          font-size: 11px;
          color: #aaa;
          margin-top: 4px;
          padding-left: 19px;
        }

        .agri-waves-el {
          display: flex;
          align-items: center;
          gap: 3px;
          height: 18px;
        }

        .agri-waves-el span {
          display: block;
          width: 3px;
          background: #56ab2f;
          border-radius: 3px;
          animation: agri-wave 1s ease-in-out infinite;
        }

        .agri-waves-el span:nth-child(1) { height: 5px;  animation-delay: 0s; }
        .agri-waves-el span:nth-child(2) { height: 12px; animation-delay: 0.1s; }
        .agri-waves-el span:nth-child(3) { height: 9px;  animation-delay: 0.2s; }
        .agri-waves-el span:nth-child(4) { height: 16px; animation-delay: 0.3s; }
        .agri-waves-el span:nth-child(5) { height: 7px;  animation-delay: 0.4s; }

        @keyframes agri-wave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50%      { transform: scaleY(1.4); opacity: 1; }
        }

        .agri-btn-el {
          display: flex;
          align-items: center;
          gap: 12px;
          background: linear-gradient(135deg, #2d7a3a 0%, #56ab2f 100%);
          color: #fff;
          border: none;
          border-radius: 60px;
          padding: 14px 24px;
          font-family: 'Sora', sans-serif;
          cursor: pointer;
          box-shadow: 0 6px 24px rgba(86,171,47,0.45);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .agri-btn-el:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(86,171,47,0.55);
        }

        .agri-btn-el.loading {
          background: linear-gradient(135deg, #888, #aaa);
          cursor: wait;
          box-shadow: none;
        }

        .agri-btn-el.ringing {
          background: linear-gradient(135deg, #1b5e20, #388e3c);
          animation: agri-ring 1.2s infinite;
        }

        .agri-btn-el.connected {
          background: linear-gradient(135deg, #1565c0, #1976d2);
          box-shadow: 0 6px 24px rgba(25,118,210,0.4);
          animation: none;
        }

        .agri-btn-el.ending {
          background: linear-gradient(135deg, #b71c1c, #e53935);
          animation: none;
        }

        @keyframes agri-ring {
          0%   { box-shadow: 0 0 0 0    rgba(56,142,60,0.6); }
          50%  { box-shadow: 0 0 0 16px rgba(56,142,60,0);   }
          100% { box-shadow: 0 0 0 0    rgba(56,142,60,0);   }
        }

        .agri-btn-icon-el {
          width: 32px;
          height: 32px;
          background: rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .agri-btn-text-el {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.25;
        }

        .agri-btn-text-el b {
          font-size: 14px;
          font-weight: 700;
        }

        .agri-btn-text-el small {
          font-size: 10px;
          opacity: 0.85;
          font-family: 'Noto Sans Devanagari', sans-serif;
        }

        @media (max-width: 480px) {
          #agrimitra-widget-react {
            bottom: 16px;
            left: 16px;
          }
          .agri-btn-el {
            padding: 12px 18px;
          }
        }
      `}</style>

      {/* Google Fonts for the widget */}
      <link
        href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Noto+Sans+Devanagari:wght@400&display=swap"
        rel="stylesheet"
      />

      <div id="agrimitra-widget-react">
        {/* Status Card */}
        {showStatus && (
          <div className="agri-status-card">
            <div className="agri-status-row">
              <span
                className={`agri-dot-el ${state === "ringing" ? "pulse" : ""}`}
                style={{ background: dotBg }}
              />
              <span>{statusText}</span>
              {showWaves && (
                <div className="agri-waves-el">
                  <span /><span /><span /><span /><span />
                </div>
              )}
            </div>
            <div className="agri-status-sub">{statusSub}</div>
          </div>
        )}

        {/* Main Button */}
        <button
          className={`agri-btn-el ${state !== "idle" ? state : ""}`}
          onClick={handleClick}
          id="agri-btn-react"
        >
          <span className="agri-btn-icon-el">🌾</span>
          <span className="agri-btn-text-el">
            <b>{btnLabel}</b>
            <small>अभी बात करें · ಮಾತನಾಡಿ</small>
          </span>
        </button>
      </div>
    </>
  );
}
