import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  Users,
  Settings,
  Plus,
  Key,
  Server,
  Activity,
  Layers,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Github
} from 'lucide-react';
import ChatView from './components/ChatView';
import HubView from './components/HubView';
import PersonaModal from './components/PersonaModal';
import api from './services/api';

export default function App() {
  const [personas, setPersonas] = useState([]);
  const [hubs, setHubs] = useState([]);
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [selectedHub, setSelectedHub] = useState(null);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'hub'

  // Settings & Engine State
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('aetheris_api_key') || '');
  const [useLocal, setUseLocal] = useState(() => localStorage.getItem('aetheris_use_local') === 'true');
  const [isVoiceLinkOn, setIsVoiceLinkOn] = useState(() => localStorage.getItem('aetheris_voice_link') === 'true');

  // Modals & Panels
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [healthStatus, setHealthStatus] = useState('checking');

  // Persist settings
  useEffect(() => {
    localStorage.setItem('aetheris_api_key', apiKey);
  }, [apiKey]);

  useEffect(() => {
    localStorage.setItem('aetheris_use_local', useLocal ? 'true' : 'false');
  }, [useLocal]);

  useEffect(() => {
    localStorage.setItem('aetheris_voice_link', isVoiceLinkOn ? 'true' : 'false');
  }, [isVoiceLinkOn]);

  // Load initial personas and hubs
  useEffect(() => {
    const initData = async () => {
      try {
        const [loadedPersonas, loadedHubs] = await Promise.all([
          api.fetchPersonas(),
          api.fetchHubs()
        ]);

        setPersonas(loadedPersonas);
        setHubs(loadedHubs);

        if (loadedPersonas.length > 0) {
          setSelectedPersona(loadedPersonas[0]);
        }
        if (loadedHubs.length > 0) {
          setSelectedHub(loadedHubs[0]);
        }

        // Test health
        const health = await api.checkHealth();
        if (health?.status === 'online') {
          setHealthStatus('online');
        } else {
          setHealthStatus('offline');
        }
      } catch (err) {
        console.error('Initialization error:', err);
        setHealthStatus('offline');
      }
    };

    initData();
  }, []);

  const handlePersonaCreated = (newPersona) => {
    setPersonas(prev => [...prev, newPersona]);
    setSelectedPersona(newPersona);
    setActiveTab('chat');
  };

  const handleSelectPersona = (persona) => {
    setSelectedPersona(persona);
    setActiveTab('chat');
  };

  const handleSelectHub = (hub) => {
    setSelectedHub(hub);
    setActiveTab('hub');
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans neural-grid">
      {/* Left Sidebar */}
      <aside className="w-80 flex-shrink-0 flex flex-col border-r border-slate-800/80 bg-slate-950/80 backdrop-blur-2xl z-20">
        {/* Brand Banner */}
        <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-purple-900/40">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-purple-400">
                <Brain className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-300 to-indigo-300">
                AETHERIS
              </h1>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 block -mt-0.5">
                COGNITIVE NEXUS
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-1.5">
            <div
              title={healthStatus === 'online' ? "Nexus Core Online" : "Connecting to Core..."}
              className={`w-2 h-2 rounded-full ${
                healthStatus === 'online' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
              }`}
            />
            <button
              onClick={() => setIsSettingsOpen(true)}
              title="Nexus Settings & API Keys"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 transition"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Quick Launch Button */}
        <div className="p-4 border-b border-slate-800/60">
          <button
            onClick={() => setIsPersonaModalOpen(true)}
            className="w-full py-2.5 px-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-md shadow-purple-950/40 transition flex items-center justify-between group"
          >
            <span className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-200 group-hover:rotate-12 transition-transform" />
              <span>Gemma 4 Quick Launch</span>
            </span>
            <Plus className="w-4 h-4 text-purple-200" />
          </button>
        </div>

        {/* Personas & Hubs Scrollable List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-6">
          {/* Historical & Synthesized Personas */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Brain className="w-3 h-3 text-purple-400" />
                Cognitive Personas
              </span>
              <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded-full">
                {personas.length}
              </span>
            </div>

            <div className="space-y-1">
              {personas.map((persona) => {
                const isSelected = activeTab === 'chat' && selectedPersona?.id === persona.id;
                return (
                  <button
                    key={persona.id}
                    onClick={() => handleSelectPersona(persona)}
                    className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between group ${
                      isSelected
                        ? 'bg-purple-950/30 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.15)] text-white'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <span className="text-xl flex-shrink-0">{persona.avatar_symbol || '🏛️'}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate group-hover:text-purple-300 transition">
                          {persona.name}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {persona.epoch}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 aura-pulse mr-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Collective Memory Hubs */}
          <div>
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Users className="w-3 h-3 text-cyan-400" />
                Collective Memory Hubs
              </span>
              <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-full">
                {hubs.length}
              </span>
            </div>

            <div className="space-y-1">
              {hubs.map((hub) => {
                const isSelected = activeTab === 'hub' && selectedHub?.id === hub.id;
                return (
                  <button
                    key={hub.id}
                    onClick={() => handleSelectHub(hub)}
                    className={`w-full p-2.5 rounded-xl text-left transition flex items-center justify-between group ${
                      isSelected
                        ? 'bg-cyan-950/30 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.15)] text-white'
                        : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 overflow-hidden">
                      <span className="text-xl flex-shrink-0">{hub.icon || '🔮'}</span>
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold truncate group-hover:text-cyan-300 transition">
                          {hub.title}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">
                          {hub.topic}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 aura-pulse mr-1" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Engine status footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/90 text-[11px]">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" />
              <span>Engine Mode:</span>
            </span>
            <span className="font-mono text-purple-300 font-semibold">
              {useLocal ? 'Local Ollama' : 'Google Gemma 4'}
            </span>
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {activeTab === 'chat' && selectedPersona ? (
          <ChatView
            persona={selectedPersona}
            apiKey={apiKey}
            useLocal={useLocal}
            isVoiceLinkOn={isVoiceLinkOn}
            onToggleVoiceLink={() => setIsVoiceLinkOn(!isVoiceLinkOn)}
          />
        ) : activeTab === 'hub' && selectedHub ? (
          <HubView
            hub={selectedHub}
            personas={personas}
            apiKey={apiKey}
            useLocal={useLocal}
            isVoiceLinkOn={isVoiceLinkOn}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500">
            Select a Persona or Collective Hub to commence cognition.
          </div>
        )}
      </main>

      {/* Gemma 4 AI Quick Launch Modal */}
      <PersonaModal
        isOpen={isPersonaModalOpen}
        onClose={() => setIsPersonaModalOpen(false)}
        onPersonaCreated={handlePersonaCreated}
        apiKey={apiKey}
        useLocal={useLocal}
      />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2 text-white font-bold text-base">
                <Settings className="w-5 h-5 text-purple-400" />
                <span>Nexus Configuration</span>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Google Gemini API Key Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Google AI Studio API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Paste your Gemini API key (optional if set in .env)"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs font-mono outline-none focus:border-purple-500"
                />
              </div>
              <p className="text-[11px] text-slate-400">
                Powers hosted Gemma 4 models (e.g. `gemma-3-27b-it` or `gemini-2.0-flash`). Free keys from Google AI Studio work instantly.
              </p>
            </div>

            {/* Local Ollama Toggle */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-200 block">
                  Local Ollama Fallback Engine
                </span>
                <span className="text-[10px] text-slate-400">
                  Runs local open-weights Gemma models at http://localhost:11434
                </span>
              </div>
              <button
                type="button"
                onClick={() => setUseLocal(!useLocal)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  useLocal ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${
                    useLocal ? 'left-7' : 'left-1'
                  }`}
                />
              </button>
            </div>

            {/* Hacktoberfest 2026 Pitch Link */}
            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs text-purple-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Hacktoberfest 2026 Contender</span>
              </div>
              <span className="font-mono text-[10px] text-cyan-300">Gemma 4</span>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-900/30"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
