import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Users,
  Send,
  Volume2,
  Copy,
  Check,
  Sparkles,
  Zap,
  Leaf,
  Clock,
  Compass,
  Shield,
  Heart,
  Loader2,
  RotateCcw,
  MessageSquare
} from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';

export default function HubView({ hub, personas, apiKey, useLocal, isVoiceLinkOn }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isDeliberating, setIsDeliberating] = useState(false);
  const [activeSpeakerId, setActiveSpeakerId] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [activeSpeechMsgId, setActiveSpeechMsgId] = useState(null);

  const messagesEndRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis);

  // Active personas participating in this hub
  const activePersonas = personas.filter(p => hub?.persona_ids?.includes(p.id));

  useEffect(() => {
    if (!hub) return;

    // Load from local storage or set initial topic introduction
    const storageKey = `aetheris_hub_${hub.id}`;
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch {
        initHubIntro();
      }
    } else {
      initHubIntro();
    }
  }, [hub?.id]);

  const initHubIntro = () => {
    const introMsg = {
      id: 'hub-intro-' + Date.now(),
      role: 'system',
      speaker_name: 'Nexus Arbiter',
      avatar_symbol: '🏛️',
      content: `### Welcome to the ${hub.title}\n\n**Topic of Deliberation:** *"${hub.topic}"*\n\n${hub.description}\n\n*Council members present:* **${activePersonas.map(p => p.name).join(', ') || 'Archived Thinkers'}**. Direct a question to the assembly or click an inquiry below to ignite the debate.`,
      mood: 'default',
      mood_label: 'Assembly Convened',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([introMsg]);
  };

  useEffect(() => {
    if (hub && messages.length > 0) {
      localStorage.setItem(`aetheris_hub_${hub.id}`, JSON.stringify(messages));
    }
  }, [messages, hub?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isDeliberating]);

  const speakMessage = (text, msgId) => {
    if (!synthRef.current) return;

    if (activeSpeechMsgId === msgId) {
      synthRef.current.cancel();
      setActiveSpeechMsgId(null);
      return;
    }

    synthRef.current.cancel();
    const cleanText = text.replace(/[*#`_\[\]()]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;

    const voices = synthRef.current.getVoices();
    if (voices.length > 0) {
      const preferred = voices.find(v => v.lang.startsWith('en'));
      if (preferred) utterance.voice = preferred;
    }

    utterance.onstart = () => setActiveSpeechMsgId(msgId);
    utterance.onend = () => setActiveSpeechMsgId(null);
    utterance.onerror = () => setActiveSpeechMsgId(null);

    synthRef.current.speak(utterance);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHub = () => {
    if (window.confirm(`Reset records of the ${hub.title}?`)) {
      localStorage.removeItem(`aetheris_hub_${hub.id}`);
      initHubIntro();
    }
  };

  const triggerDebate = async (customMessage) => {
    const messageToSend = customMessage || inputValue;
    if (!messageToSend.trim() || isDeliberating) return;

    const userMessage = {
      id: 'usr-hub-' + Date.now(),
      role: 'user',
      speaker_name: 'Council Interlocutor',
      content: messageToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsDeliberating(true);

    try {
      const historyPayload = newMessages.slice(-8).map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        content: m.role === 'user' ? m.content : `${m.speaker_name}: ${m.content}`
      }));

      const response = await fetch('/api/chat/group/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          hub_id: hub.id,
          message: messageToSend.trim(),
          history: historyPayload,
          api_key: apiKey,
          use_local: useLocal
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Council deliberation interrupted');
      }

      // Add each council response sequentially
      const responses = data.responses || [];
      for (const res of responses) {
        setActiveSpeakerId(res.persona_id);
        const councilMsg = {
          id: 'council-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
          role: 'model',
          persona_id: res.persona_id,
          speaker_name: res.persona_name,
          avatar_symbol: res.avatar_symbol || '🏛️',
          content: res.response,
          mood: res.mood || 'default',
          mood_label: res.mood_label || 'Philosophical',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, councilMsg]);

        if (isVoiceLinkOn) {
          speakMessage(`${councilMsg.speaker_name} states: ${councilMsg.content}`, councilMsg.id);
        }
      }
    } catch (err) {
      const errorMsg = {
        id: 'err-hub-' + Date.now(),
        role: 'system',
        speaker_name: 'Arbiter Alert',
        avatar_symbol: '⚠️',
        content: `*Debate disrupted: ${err.message}. Ensure your Google Gemini API key or local Ollama is active.*`,
        mood: 'angry',
        mood_label: 'Communication Fault',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsDeliberating(false);
      setActiveSpeakerId(null);
    }
  };

  const renderMoodBadge = (mood, moodLabel) => {
    const moodConfigs = {
      happy: { icon: Sparkles, color: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-500/10' },
      sad: { icon: Leaf, color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-500/10' },
      angry: { icon: Zap, color: 'text-rose-400', border: 'border-rose-400/30', bg: 'bg-rose-500/10' },
      nostalgic: { icon: Clock, color: 'text-purple-400', border: 'border-purple-400/30', bg: 'bg-purple-500/10' },
      curious: { icon: Compass, color: 'text-cyan-400', border: 'border-cyan-400/30', bg: 'bg-cyan-500/10' },
      protective: { icon: Shield, color: 'text-indigo-400', border: 'border-indigo-400/30', bg: 'bg-indigo-500/10' },
      default: { icon: Heart, color: 'text-violet-400', border: 'border-violet-400/30', bg: 'bg-violet-500/10' }
    };

    const config = moodConfigs[mood] || moodConfigs.default;
    const Icon = config.icon;

    return (
      <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${config.border} ${config.bg} ${config.color} mb-1.5 backdrop-blur-md`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current aura-pulse" />
        <Icon className="w-3 h-3" />
        <span>{moodLabel || 'Resonant'}</span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950/60 relative">
      {/* Hub Header & Roster */}
      <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-xl z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
            {hub.icon || '🔮'}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-base font-bold text-white tracking-tight">{hub.title}</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono">
                Multi-Agent Arena
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-1">{hub.topic}</p>
          </div>
        </div>

        {/* Participating Personas Roster with Active Speaker Ring */}
        <div className="flex items-center space-x-3">
          {Boolean(activeSpeechMsgId) && (
            <AudioVisualizer isActive={true} mode="speaking" />
          )}

          <div className="flex items-center -space-x-2 overflow-hidden py-1">
            {activePersonas.map((p) => {
              const isSpeaking = activeSpeakerId === p.id;
              return (
                <div
                  key={p.id}
                  title={`${p.name} (${p.archetype})`}
                  className={`relative w-9 h-9 rounded-full flex items-center justify-center text-sm bg-slate-850 border-2 transition transform hover:scale-110 z-0 ${
                    isSpeaking
                      ? 'border-cyan-400 ring-4 ring-cyan-400/40 z-10 scale-105'
                      : 'border-slate-700'
                  }`}
                >
                  {p.avatar_symbol || '✨'}
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 aura-pulse" />
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleClearHub}
            title="Reset Arena Dialogue"
            className="p-2 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Stream */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          const isSystem = msg.role === 'system';
          const isSpeaking = activeSpeechMsgId === msg.id;

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} group`}
            >
              {!isUser && !isSystem && msg.mood && renderMoodBadge(msg.mood, msg.mood_label)}

              <div
                className={`relative max-w-[90%] md:max-w-[80%] rounded-2xl px-5 py-4 transition shadow-lg ${
                  isUser
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-none shadow-cyan-950/40'
                    : isSystem
                    ? 'bg-purple-950/20 border border-purple-500/30 text-slate-200 rounded-xl w-full max-w-full'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-100 rounded-bl-none shadow-slate-950/60 backdrop-blur-md'
                }`}
              >
                {/* Speaker Header */}
                {!isUser && (
                  <div className="flex items-center space-x-2 mb-2 pb-1.5 border-b border-white/5">
                    <span className="text-base">{msg.avatar_symbol || '🏛️'}</span>
                    <span className="font-semibold text-xs text-cyan-300">{msg.speaker_name}</span>
                  </div>
                )}

                {/* Message Body */}
                <div className="prose prose-invert prose-sm max-w-none break-words leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {msg.content}
                  </ReactMarkdown>
                </div>

                {/* Action footer */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400/80">
                  <span>{msg.timestamp}</span>

                  <div className="flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition">
                    {!isUser && (
                      <button
                        onClick={() => speakMessage(msg.content, msg.id)}
                        title={isSpeaking ? "Stop Speaking" : "Play Council Voice"}
                        className={`p-1 rounded-md transition ${
                          isSpeaking 
                            ? 'text-cyan-400 bg-cyan-500/20' 
                            : 'hover:text-cyan-300 hover:bg-slate-800'
                        }`}
                      >
                        <Volume2 className={`w-3.5 h-3.5 ${isSpeaking ? 'animate-pulse' : ''}`} />
                      </button>
                    )}

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

        {isDeliberating && (
          <div className="flex items-center space-x-3 text-cyan-400 py-2 animate-pulse">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xs">Council personas are debating and synthesizing perspectives...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Group Topic Prompt Pills */}
      {hub.prompts?.length > 0 && (
        <div className="px-4 md:px-8 py-2 flex flex-wrap gap-2 border-t border-slate-900/60 bg-slate-950/80">
          <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1 my-auto mr-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> Debate Topics:
          </span>
          {hub.prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => triggerDebate(p)}
              disabled={isDeliberating}
              className="px-3 py-1 rounded-full text-xs bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-slate-300 hover:text-cyan-200 transition text-left truncate max-w-[320px]"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Input bar */}
      <div className="p-4 md:px-8 bg-slate-900/80 border-t border-slate-800/80 backdrop-blur-xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            triggerDebate();
          }}
          className="flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Pose an inquiry or challenge to the assembled council..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isDeliberating}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-100 placeholder-slate-500 text-sm outline-none transition"
          />

          <button
            type="submit"
            disabled={isDeliberating || !inputValue.trim()}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm shadow-lg shadow-cyan-950/50 transition flex items-center space-x-2"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Deliberate</span>
          </button>
        </form>
      </div>
    </div>
  );
}
