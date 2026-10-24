import React, { useState } from 'react';
import {
  Wand2,
  Sparkles,
  Sliders,
  Cpu,
  Brain,
  Zap,
  Clock,
  Compass,
  Check,
  Loader2,
  ShieldAlert,
  Flame,
  Binary
} from 'lucide-react';

export default function PersonaForge({ onPersonaCreated, apiKey, useLocal, onCancel }) {
  const [name, setName] = useState('');
  const [epoch, setEpoch] = useState('Timeless Frontier');
  const [rationality, setRationality] = useState(65); // 0 (Pure Passion) to 100 (Pure Stoic Logic)
  const [empiricism, setEmpiricism] = useState(80); // 0 (Mystic / Visionary) to 100 (Mathematical / Empirical)
  const [rhetoric, setRhetoric] = useState('Philosophical and visionary');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [error, setError] = useState('');
  const [synthesizedProfile, setSynthesizedProfile] = useState(null);

  // Quick Archetype Presets
  const presets = [
    {
      title: "Stoic Sovereign",
      name: "Marcus Aurelius II",
      epoch: "Neo-Classical Rome",
      rationality: 95,
      empiricism: 70,
      rhetoric: "Austere, meditative, unshakeable",
      icon: "🏛️"
    },
    {
      title: "Cosmic Electromagnetist",
      name: "Nikola Tesla Prime",
      epoch: "The Electric Revolution",
      rationality: 40,
      empiricism: 90,
      rhetoric: "Electrifying, poetic, cosmic harmonics",
      icon: "⚡"
    },
    {
      title: "Algorithmic Oracle",
      name: "Lady Ada Nova",
      epoch: "Victorian Cybernetics",
      rationality: 85,
      empiricism: 95,
      rhetoric: "Poetic science and mathematical prophecy",
      icon: "✨"
    },
    {
      title: "Renaissance Polymath",
      name: "Leonardo Synthetica",
      epoch: "High Renaissance Florence",
      rationality: 60,
      empiricism: 80,
      rhetoric: "Inquisitive, empirical, artistic mastery",
      icon: "🎨"
    }
  ];

  const applyPreset = (p) => {
    setName(p.name);
    setEpoch(p.epoch);
    setRationality(p.rationality);
    setEmpiricism(p.empiricism);
    setRhetoric(p.rhetoric);
  };

  const handleSynthesize = async () => {
    if (!name.trim()) {
      setError("Please specify a persona name or archetype.");
      return;
    }

    setError('');
    setIsSynthesizing(true);

    const contextPayload = `Cognitive DNA Calibration: Rationality-vs-Passion: ${rationality}%, Empiricism-vs-Intuition: ${empiricism}%, Era/Epoch: ${epoch}, Rhetoric Target: ${rhetoric}`;

    try {
      const response = await fetch('/api/persona/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          context: contextPayload,
          api_key: apiKey,
          use_local: useLocal
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to synthesize cognitive DNA');
      }

      setSynthesizedProfile(data.profile);
    } catch (err) {
      setError(err.message || 'Gemma 4 synthesis failed.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleCommit = async () => {
    if (!synthesizedProfile) return;

    try {
      const response = await fetch('/api/persona/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(synthesizedProfile)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to anchor persona to nexus memory');
      }

      onPersonaCreated(data.persona);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-y-auto p-6 md:p-10 bg-slate-950/70 relative z-10">
      {/* Header Banner */}
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-5">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-900/40">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-300">
                <Brain className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                Cognitive Synthesizer Studio
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Gemma 4 DNA Engine
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Calibrate neurological and philosophical vectors to forge customized historical and speculative intelligences.
              </p>
            </div>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs px-3 py-1.5 rounded-lg border border-slate-700 text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Exit Studio
            </button>
          )}
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Studio Presets */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Archetype Seeds
          </span>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => applyPreset(p)}
                className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-purple-500/40 hover:bg-purple-950/20 text-left transition group shadow-md"
              >
                <div className="text-2xl mb-1">{p.icon}</div>
                <div className="text-xs font-bold text-slate-200 group-hover:text-purple-300 transition">
                  {p.title}
                </div>
                <div className="text-[10px] text-slate-500 truncate">{p.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Parameter Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl">
          {/* Identity & Era */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Persona Identity / Name <span className="text-purple-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Hypatia, Alan Turing, Gottfried Leibniz, Carl Sagan"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-700 focus:border-cyan-400 text-slate-100 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Epoch & Historical Realm
              </label>
              <input
                type="text"
                value={epoch}
                onChange={(e) => setEpoch(e.target.value)}
                placeholder="e.g. Victorian London, Classical Athens, Quantum Epoch"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Rhetorical Cadence
              </label>
              <input
                type="text"
                value={rhetoric}
                onChange={(e) => setRhetoric(e.target.value)}
                placeholder="e.g. Solemn stoicism, electrifying passion, mathematical clarity"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 focus:border-cyan-400 text-slate-200 text-sm outline-none transition"
              />
            </div>
          </div>

          {/* Neurological Vector Sliders */}
          <div className="space-y-5 bg-slate-950/50 p-5 rounded-xl border border-slate-800/60">
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              Cognitive Vector Calibration
            </h3>

            {/* Slider 1: Rationality vs Passion */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1 text-rose-400">
                  <Flame className="w-3.5 h-3.5" /> Passionate Fire ({100 - rationality}%)
                </span>
                <span className="flex items-center gap-1 text-cyan-400">
                  Stoic Logic ({rationality}%) <Brain className="w-3.5 h-3.5" />
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rationality}
                onChange={(e) => setRationality(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Slider 2: Empiricism vs Intuition */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1 text-purple-400">
                  <Sparkles className="w-3.5 h-3.5" /> Cosmic Intuition ({100 - empiricism}%)
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  Empirical Rigor ({empiricism}%) <Binary className="w-3.5 h-3.5" />
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={empiricism}
                onChange={(e) => setEmpiricism(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <button
                onClick={handleSynthesize}
                disabled={isSynthesizing || !name.trim()}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 disabled:opacity-50 transition shadow-lg shadow-purple-950/50 flex items-center justify-center space-x-2"
              >
                {isSynthesizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Engaging Gemma 4 Neural Synthesis (~1.5s)...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    <span>Synthesize Cognitive Matrix</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Synthesized Output Preview */}
        {synthesizedProfile && (
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-3.5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-3xl shadow-inner">
                  {synthesizedProfile.avatar_symbol || '✨'}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    {synthesizedProfile.name}
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono">
                      {synthesizedProfile.archetype}
                    </span>
                  </h3>
                  <p className="text-xs text-purple-300 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    {synthesizedProfile.epoch}
                  </p>
                </div>
              </div>

              <button
                onClick={handleCommit}
                className="px-5 py-2.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-emerald-500 to-cyan-600 hover:from-emerald-400 hover:to-cyan-500 shadow-lg shadow-emerald-950/40 flex items-center gap-2 transition"
              >
                <Check className="w-4 h-4" />
                <span>Anchor Persona into Nexus</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2">
                <span className="font-semibold text-slate-400 block">Greeting Cadence:</span>
                <p className="italic text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  "{synthesizedProfile.typical_greeting}"
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-semibold text-slate-400 block">Synthesized Bio:</span>
                <p className="text-slate-300 bg-slate-950/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                  {synthesizedProfile.bio}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
