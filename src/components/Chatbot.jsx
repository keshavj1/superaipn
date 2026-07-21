import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Loader2, X, Sparkles } from 'lucide-react';
import superAipLogo from '../assets/super_aip_logo.png';

/* Backend base URL. Vite inlines this AT BUILD TIME, so if VITE_API_URL is not
   set in the deploy environment the bundle previously shipped a hardcoded
   http://localhost:5000 — which fails for every visitor and is additionally
   blocked as mixed content on an HTTPS page. The localhost fallback is now
   restricted to dev builds; a production build without the variable disables
   the widget instead of failing silently. See .env.example. */
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000' : '');

// How long to wait before giving up, so a hung backend cannot spin forever.
const REQUEST_TIMEOUT_MS = 20_000;

const SUGGESTIONS = ['What is Super AIP?', 'What do you do?', 'Explore products'];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hi there 👋 I'm Super AIP, your AI assistant. Ask me anything about our platform, products, or research.",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen]);

  // Focus the input as soon as the panel opens.
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  /* Lets anything on the page open the assistant without prop-drilling
     through the route tree — e.g. Contact's "Start a Chat" button:
     window.dispatchEvent(new Event("superaip:open-chat")) */
  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("superaip:open-chat", open);
    return () => window.removeEventListener("superaip:open-chat", open);
  }, []);

  const handleSend = async (msg) => {
    const userMessage = (typeof msg === 'string' ? msg : input).trim();
    if (userMessage === '' || isLoading) return;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [...prev, { text: userMessage, sender: 'user', time: currentTime }]);
    setInput('');
    setIsLoading(true);

    const stamp = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const reply = (text) =>
      setMessages((prev) => [...prev, { text, sender: 'bot', time: stamp() }]);

    if (!API_URL) {
      reply("The assistant isn't available right now. Please use the contact form and we'll get back to you.");
      setIsLoading(false);
      return;
    }

    // AbortController bounds the wait; without it a hung backend left the
    // typing indicator spinning and the input disabled indefinitely.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userMessage }),
        signal: controller.signal,
      });

      /* fetch does NOT reject on 4xx/5xx, so without this check the server's
         { error: ... } payload fell through to the generic fallback below and
         the real failure was never surfaced. */
      if (!response.ok) {
        if (response.status === 429) {
          reply("You're sending messages a little too quickly — please wait a moment and try again.");
        } else {
          reply("Sorry, I couldn't process that. Please try again in a moment.");
        }
        return;
      }

      const data = await response.json();
      reply(data.text || "Sorry, I couldn't process that.");
    } catch (error) {
      // User-facing copy stays non-technical; details go to the console.
      console.error('Error fetching from chatbot backend:', error);
      reply(
        error.name === 'AbortError'
          ? 'That took too long to answer. Please try again.'
          : "I can't reach the assistant right now. Please try again shortly, or use the contact form."
      );
    } finally {
      clearTimeout(timer);
      setIsLoading(false);
    }
  };

  return (
    /* chatbot-root is the hook theme-light.css uses. This widget renders
       outside <main>, so the site-wide "main .text-white" light-mode rule
       never reached it — its text stayed white while its panel turned white. */
    <div className="chatbot-root fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] flex flex-col items-end font-sans">
      {/* ===== Chat Window ===== */}
      <div
        className={`mb-4 flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b0c16]/95 backdrop-blur-xl shadow-[0_24px_60px_-15px_rgba(99,102,241,0.45)] transition-all duration-500 origin-bottom-right ${
          isOpen
            ? 'h-[600px] sm:h-[640px] w-[calc(100vw-2rem)] sm:w-[400px] max-h-[85vh] opacity-100 scale-100 translate-y-0'
            : 'h-0 w-0 opacity-0 scale-90 translate-y-4 pointer-events-none'
        }`}
      >
        {/* Header */}
        <div className="relative flex items-center justify-between gap-3 px-5 py-4 overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 text-white shrink-0">
          {/* Decorative glow */}
          <div className="absolute -top-10 -right-8 h-32 w-32 rounded-full bg-white/15 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-8 h-28 w-28 rounded-full bg-black/20 blur-2xl pointer-events-none" />

          <div className="relative flex items-center gap-3 min-w-0">
            <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur">
              <img src={superAipLogo} alt="Super AIP" className="h-7 w-7 object-contain" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-indigo-600" />
            </div>
            <div className="min-w-0">
              <h3 className="flex items-center gap-1.5 text-[15px] font-bold leading-tight tracking-wide text-white">
                Super AIP
                <Sparkles size={13} className="text-yellow-300" />
              </h3>
              <div className="mt-0.5 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium text-indigo-100/90">AI Assistant · Online</span>
              </div>
            </div>
          </div>

          <button
            className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            onClick={() => setIsOpen(false)}
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-scroll flex-1 space-y-4 overflow-y-auto bg-[#070810] px-4 py-5">
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={index}
                className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${
                  isUser ? 'justify-end' : 'justify-start'
                }`}
                style={{ animationFillMode: 'both' }}
              >
                <div className={`flex max-w-[85%] gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className="flex shrink-0 items-end">
                    {isUser ? (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-white shadow-md">
                        <User size={15} />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-violet-500/20">
                        <img src={superAipLogo} alt="Super AIP" className="h-5 w-5 object-contain" />
                      </div>
                    )}
                  </div>

                  {/* Bubble */}
                  <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`whitespace-pre-wrap break-words px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
                        isUser
                          ? 'rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : 'rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] text-slate-100'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="mt-1 px-1 text-[10px] font-medium text-slate-500">{msg.time}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex w-full justify-start animate-in fade-in duration-300">
              <div className="flex max-w-[85%] gap-2.5">
                <div className="flex shrink-0 items-end">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-violet-500/20">
                    <img src={superAipLogo} alt="Super AIP" className="h-5 w-5 object-contain" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3.5">
                  <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-violet-400 animate-bounce" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} className="h-1" />
        </div>

        {/* Input area */}
        <div className="shrink-0 border-t border-white/10 bg-[#0b0c16] p-3.5">
          {/* Quick actions */}
          <div className="mb-2.5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {SUGGESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="whitespace-nowrap rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1.5 text-[11px] font-semibold text-violet-200 transition-all duration-300 hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-500 hover:text-white disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-1.5 transition-all focus-within:border-violet-500/50 focus-within:bg-white/[0.07] focus-within:ring-4 focus-within:ring-violet-500/10">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask me anything..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={isLoading}
            />
            <button
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                input.trim() && !isLoading
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-purple-500/30 hover:scale-105 active:scale-95'
                  : 'bg-white/10 text-slate-500'
              }`}
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <Send size={17} className={input.trim() ? 'translate-x-px' : ''} />
              )}
            </button>
          </div>

          <p className="mt-2.5 text-center text-[10px] font-medium text-slate-600">
            Powered by Super AIP Technology
          </p>
        </div>
      </div>

      {/* ===== Floating Action Button ===== */}
      <button
        className="group relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 shadow-xl shadow-purple-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-purple-500/50 active:scale-95"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Glow */}
        <span className="absolute inset-0 -z-10 rounded-full bg-violet-500 opacity-50 blur-xl transition-opacity duration-500 group-hover:opacity-80" />

        {/* Icons cross-fade between open/closed states */}
        <X
          size={28}
          className={`absolute text-white drop-shadow-md transition-all duration-300 ${
            isOpen ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-50 opacity-0'
          }`}
        />
        <span
          className={`relative transition-all duration-300 ${
            isOpen ? 'rotate-90 scale-50 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`}
        >
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white shadow-inner ring-1 ring-white/40">
            <img src={superAipLogo} alt="Super AIP" className="h-7 w-7 sm:h-8 sm:w-8 object-contain" />
          </span>
          {/* Notification badge */}
          <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 ring-2 ring-[var(--color-bg)]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
          </span>
        </span>
      </button>
    </div>
  );
};

export default Chatbot;
