import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RefreshCw,
  Sparkles,
  Info,
  Clock,
  Compass,
  Zap,
  Leaf,
  Shield,
  Heart,
  HelpCircle,
  Trash2,
  Loader2,
  ChevronDown
} from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

export default function ChatView({ persona, apiKey, useLocal, isVoiceLinkOn, onToggleVoiceLink }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [activeSpeechMsgId, setActiveSpeechMsgId] = useState(null);
  const [showPersonaInfo, setShowPersonaInfo] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Default icebreakers for current persona
  const icebreakerPills = [
    "What is your foundational philosophy?",
    "Tell me about your greatest triumph and regret.",
    "What advice do you have for our civilization today?"
  ];

  // Initialize or load conversation history when persona changes
  useEffect(() => {
    if (!persona) return;

    // Load from local storage or set greeting
    const storageKey = `aetheris_chat_${persona.id}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        initGreeting();
      }
    } else {
      initGreeting();
    }
  }, [persona?.id]);

  const initGreeting = () => {
    const greetingMsg = {
      id: 'greeting-' + Date.now(),
      role: 'model',
      content: persona.typical_greeting || `Greetings. I am ${persona.name}. What inquiries do you bring to our nexus today?`,
      mood: 'default',
      mood_label: 'Serene & Balanced',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([greetingMsg]);
    if (isVoiceLinkOn) {
      speakMessage(greetingMsg.content, greetingMsg.id);
    }
  };

  // Save messages to local storage
  useEffect(() => {
    if (persona && messages.length > 0) {
      localStorage.setItem(`aetheris_chat_${persona.id}`, JSON.stringify(messages));
    }
  }, [messages, persona?.id]);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Web Speech Synthesis (TTS)
  const speakMessage = (text, msgId) => {
    if (!synthRef.current) return;

    // If already speaking this message, cancel
    if (activeSpeechMsgId === msgId) {
      synthRef.current.cancel();
      setActiveSpeechMsgId(null);
      return;
    }

    synthRef.current.cancel();
    // Clean markdown characters for clean speech
    const cleanText = text.replace(/[*#`_\[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try finding appropriate voice
    const voices = synthRef.current.getVoices();
    if (voices.length > 0) {
      const preferred = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Premium')));
      if (preferred) utterance.voice = preferred;
    }

    utterance.onstart = () => setActiveSpeechMsgId(msgId);
    utterance.onend = () => setActiveSpeechMsgId(null);
    utterance.onerror = () => setActiveSpeechMsgId(null);

    synthRef.current.speak(utterance);
  };

  // Web Speech Recognition (STT Voice Dictation)
  const toggleSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => (prev ? prev + ' ' : '') + transcript);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (window.confirm(`Reset nexus memory dialogue with ${persona.name}?`)) {
      localStorage.removeItem(`aetheris_chat_${persona.id}`);
      initGreeting();
    }
  };

  const sendMessage = async (overrideText) => {
    const textToSend = overrideText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build context history
      const historyPayload = newMessages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch('/api/chat/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona_id: persona.id,
          message: textToSend.trim(),
          history: historyPayload,
          api_key: apiKey,
          use_local: useLocal
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to receive cognition from persona');
      }

      const botMessage = {
        id: 'bot-' + Date.now(),
        role: 'model',
        content: data.response,
        mood: data.mood || 'default',
        mood_label: data.mood_label || 'Serene & Balanced',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMessage]);

      if (isVoiceLinkOn) {
        speakMessage(botMessage.content, botMessage.id);
      }
    } catch (err) {
      const errorMsg = {
        id: 'err-' + Date.now(),
        role: 'model',
        content: `*Nexus Communication Disruption: ${err.message}. Ensure your Google Gemini API key is configured or local Ollama is active.*`,
        mood: 'angry',
        mood_label: 'Connection Error',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Render Mood Badge with Glowing Aura
  const renderMoodBadge = (mood, moodLabel) => {
    const moodConfigs = {
      happy: { icon: Sparkles, color: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-500/10', glow: 'shadow-[0_0_12px_rgba(251,191,36,0.3)]' },
      sad: { icon: Leaf, color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-500/10', glow: 'shadow-[0_0_12px_rgba(52,211,153,0.3)]' },
      angry: { icon: Zap, color: 'text-rose-400', border: 'border-rose-400/30', bg: 'bg-rose-500/10', glow: 'shadow-[0_0_12px_rgba(248,113,113,0.3)]' },
      nostalgic: { icon: Clock, color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-500/10', glow: 'shadow-[0_0_12px_rgba(192,132,252,0.3)]' },
      curious: { icon: Compass, color: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-500/10', glow: 'shadow-[0_0_12px_rgba(56,189,248,0.3)]' },
      protective: { icon: Shield, color: 'text-indigo-400', border: 'border-indigo-400/30', bg: 'bg-indigo-500/10', glow: 'shadow-[0_0_12px_rgba(129,140,248,0.3)]' },
      default: { icon: Heart, color: 'text-violet-400', border: 'border-violet-400/30', bg: 'bg-violet-500/10', glow: 'shadow-[0_0_12px_rgba(168,85,247,0.3)]' }
    };

    const config = moodConfigs[mood] || moodConfigs.default;
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${config.border} ${config.bg} ${config.color} ${config.glow} mb-2 backdrop-blur-md`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current aura-pulse" />
        <Icon className="w-3 h-3" />
        <span className="tracking-wide">{moodLabel || 'Resonant'}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/60 relative">
      {/* Top Bar for Persona & Voice Controls */}
      <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl flex items-center justify-between z-10">
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
            {persona.avatar_symbol || '🏛️'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight">{persona.name}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-purple-500/15 border border-purple-500/30 text-purple-300 font-mono">
                {persona.epoch}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">{persona.archetype}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-3">
          {/* Real-time Audio Spectrum */}
          {(Boolean(activeSpeechMsgId) || isRecording) && (
            <AudioVisualizer 
              isActive={true} 
              mode={isRecording ? 'listening' : 'speaking'} 
            />
          )}

          {/* Persona Info Accordion Toggle */}
          <button
            onClick={() => setShowPersonaInfo(!showPersonaInfo)}
            title="Inspect Persona Codex"
            className={`p-2 rounded-xl text-xs flex items-center space-x-1 border transition ${
              showPersonaInfo 
                ? 'bg-purple-500/20 border-purple-500/40 text-purple-300' 
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Codex</span>
          </button>

          {/* Voice Link Button */}
          <button
            onClick={onToggleVoiceLink}
            title={isVoiceLinkOn ? "Voice Link Active (Audio responses ON)" : "Voice Link Inactive"}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-2 border transition ${
              isVoiceLinkOn
                ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isVoiceLinkOn ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Voice Link: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Voice Link: OFF</span>
              </>
            )}
          </button>

          {/* Reset chat */}
          <button
            onClick={handleClearChat}
            title="Clear Dialogue Memory"
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Persona Codex Drawer (Collapsible) */}
      {showPersonaInfo && (
        <div className="px-6 py-4 bg-slate-900/90 border-b border-purple-500/20 backdrop-blur-2xl text-xs text-slate-300 space-y-3 animate-in slide-in-from-top duration-200 z-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <span className="font-semibold text-purple-300 block mb-1">Rhetoric & Speech Style</span>
              <p className="text-slate-400 leading-relaxed">{persona.speech_style}</p>
            </div>
            <div>
              <span className="font-semibold text-cyan-300 block mb-1">Guiding Principles</span>
              <ul className="list-disc list-inside text-slate-400 space-y-0.5">
                {persona.guiding_principles?.map((p, idx) => (
                  <li key={idx} className="line-clamp-2">{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-pink-300 block mb-1">Biography</span>
              <p className="text-slate-400 leading-relaxed line-clamp-3">{persona.bio}</p>
            </div>
          </div>
        </div>
      )}

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isSpeaking = activeSpeechMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
            >
              {/* Mood Badge above Persona Response */}
              {!isUser && msg.mood && renderMoodBadge(msg.mood, msg.mood_label)}

              <div
                className={`relative max-w-[85%] md:max-w-[75%] rounded-2xl px-5 py-4 transition shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-purple-950/40'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-100 rounded-bl-none shadow-slate-950/60 backdrop-blur-md'
                }`}
              >
                {/* Message Content */}
                <div className="prose prose-invert prose-sm max-w-none break-words leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Footer bar with timestamp and action buttons */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400/80">
                  <span>{msg.timestamp}</span>

                  <div className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition">
                    {/* Read Aloud Replay Button for persona messages */}
                    {!isUser && (
                      <button
                        onClick={() => speakMessage(msg.content, msg.id)}
                        title={isSpeaking ? "Stop Speaking" : "Replay Spoken Audio"}
                        className={`p-1 rounded-md transition ${
                          isSpeaking 
                            ? 'text-cyan-400 bg-cyan-500/20' 
                            : 'hover:text-cyan-300 hover:bg-slate-800'
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                      </button>
                    )}

                    {/* Copy button */}
                    <button
                      onClick={() => handleCopy(msg.content, msg.id)}
                      title="Copy to Clipboard"
                      className="p-1 rounded-md hover:text-slate-200 hover:bg-slate-800 transition"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-center space-x-3 text-slate-400 py-2 animate-pulse">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm">
              {persona.avatar_symbol || '✨'}
            </div>
            <div className="flex items-center space-x-1.5 text-xs text-purple-300">
              <Loader2 className="w-4 h-4 animate-spin text-cyan-400" />
              <span>{persona.name} is formulating cognition...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Starter Prompts (Icebreaker Pills) */}
      <div className="px-4 md:px-8 py-2 flex flex-wrap gap-2 border-t border-slate-900/60 bg-slate-950/80">
        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 my-auto mr-1">
          <Sparkles className="w-3 h-3 text-purple-400" /> Starter Prompts:
        </span>
        {icebreakerPills.map((pill, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(pill)}
            disabled={isLoading}
            className="px-3 py-1 rounded-full text-xs bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-purple-500/10 text-slate-300 hover:text-purple-200 transition text-left truncate max-w-[280px]"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Input Field Bar */}
      <div className="p-4 md:px-8 bg-slate-900/80 border-t border-slate-800/80 backdrop-blur-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
          className="flex items-center space-x-2"
        >
          {/* Voice Input (SpeechRecognition) button */}
          <button
            type="button"
            onClick={toggleSpeechRecognition}
            title={isRecording ? "Listening... (Click to stop)" : "Speak via Voice Recognition"}
            className={`p-3 rounded-xl border transition ${
              isRecording
                ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.4)]'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40'
            }`}
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            placeholder={isRecording ? "Listening to your voice..." : `Converse with ${persona.name}...`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-slate-100 placeholder-slate-500 text-sm outline-none transition"
          />

          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-white shadow-lg shadow-purple-950/50 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
