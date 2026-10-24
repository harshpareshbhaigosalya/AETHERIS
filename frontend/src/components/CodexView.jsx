import React, { useState } from 'react';
import {
  BookOpen,
  Clock,
  Sparkles,
  ArrowRight,
  Quote,
  Shield,
  Zap,
  Cpu,
  Layers,
  Compass
} from 'lucide-react';

export default function CodexView({ personas, onSelectPersona, onOpenForge }) {
  const [selectedEpoch, setSelectedEpoch] = useState('all');

  const epochs = [
    { id: 'all', label: 'All Epochs' },
    { id: 'rome', label: 'Classical Rome', match: 'Roman' },
    { id: 'victorian', label: 'Victorian Science', match: 'Victorian' },
    { id: 'electric', label: 'Age of Power', match: '1856' }
  ];

  const filteredPersonas = selectedEpoch === 'all'
    ? personas
    : personas.filter(p => {
        const ep = epochs.find(e => e.id === selectedEpoch);
        return ep?.match ? (p.epoch.includes(ep.match) || p.bio.includes(ep.match)) : true;
      });

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 md:p-10 bg-slate-950/70 relative z-10">
      <div className="max-w-5xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-purple-500/20 pb-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl shadow-inner">
              <BookOpen className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                The Historical Codex & Mind Archive
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {personas.length} Anchored Intellects
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore the philosophical epochs, guiding principles, and cognitive artifacts stored within AETHERIS.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenForge}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 shadow-lg shadow-purple-950/40 transition flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Open Cognitive Studio</span>
          </button>
        </div>

        {/* Epoch Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {epochs.map(e => (
            <button
              key={e.id}
              onClick={() => setSelectedEpoch(e.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${
                selectedEpoch === e.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-950/50'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {e.label}
            </button>
          ))}
        </div>

        {/* Personas Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonas.map((persona) => (
            <div
              key={persona.id}
              className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 hover:border-purple-500/40 hover:bg-slate-900/90 transition shadow-xl flex flex-col justify-between group backdrop-blur-md"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition transform">
                    {persona.avatar_symbol || '🏛️'}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {persona.epoch}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition">
                    {persona.name}
                  </h3>
                  <p className="text-xs text-cyan-400 font-medium">{persona.archetype}</p>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {persona.bio}
                </p>

                {/* Core Principles Snippet */}
                {persona.guiding_principles?.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                      Guiding Axiom:
                    </span>
                    <p className="text-[11px] text-slate-300 italic line-clamp-2">
                      "{persona.guiding_principles[0]}"
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-slate-800/60">
                <button
                  onClick={() => onSelectPersona(persona)}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-white bg-slate-800 hover:bg-purple-600 transition flex items-center justify-center space-x-2 group-hover:shadow-lg group-hover:shadow-purple-950/40"
                >
                  <span>Converse with Mind</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
