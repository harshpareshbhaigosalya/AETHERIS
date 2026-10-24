import React, { useState } from 'react';
import { X, Sparkles, Wand2, Loader2, Check, Shield, BookOpen, MessageSquare, Clock } from 'lucide-react';

export default function PersonaModal({ isOpen, onClose, onPersonaCreated, apiKey, useLocal }) {
  const [name, setName] = useState('');
  const [context, setContext] = useState('');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  // Synthesized profile state
  const [profile, setProfile] = useState(null);

  if (!isOpen) return null;

  const handleSynthesize = async (e) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError('Please provide a name or concept to synthesize.');
      return;
    }

    setError('');
    setIsSynthesizing(true);

    try {
      const response = await fetch('/api/persona/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          context: context.trim(),
          api_key: apiKey,
          use_local: useLocal
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to synthesize persona');
      }

      setProfile(data.profile);
    } catch (err) {
      setError(err.message || 'Error communicating with Gemma 4 synthesis engine.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    setIsSaving(true);
    setError('');

    try {
      const response = await fetch('/api/persona/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save persona');
      }

      onPersonaCreated(data.persona);
      onClose();
      // Reset form
      setName('');
      setContext('');
      setProfile(null);
    } catch (err) {
      setError(err.message || 'Failed to save synthesized persona.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900/90 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-950/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header glow accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-400 to-pink-500" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                Gemma 4 Cognitive Quick Launch
                <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono">
                  ~1.5s
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Synthesize any historical, scientific, or mythological persona into pure cognition.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start space-x-2">
              <span className="font-mono">✕</span>
              <p>{error}</p>
            </div>
          )}

          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Persona Name or Concept <span className="text-purple-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Leonardo da Vinci, Alan Turing, Hypatia of Alexandria, Albert Einstein"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSynthesize(e)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950/80 border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-slate-100 placeholder-slate-500 text-sm transition outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Era / Philosophical Domain (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. High Renaissance Italy, Cybernetics, Ancient Alexandria"
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full px-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 text-slate-200 placeholder-slate-600 text-sm transition outline-none"
              />
            </div>

            <button
              onClick={handleSynthesize}
              disabled={isSynthesizing || !name.trim()}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center space-x-2 shadow-lg shadow-purple-900/30"
            >
              {isSynthesizing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>Synthesizing Persona with Gemma 4...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-purple-200" />
                  <span>AI Quick Launch (Synthesize Profile)</span>
                </>
              )}
            </button>
          </div>

          {/* Synthesized Preview Card */}
          {profile && (
            <div className="p-5 rounded-xl bg-slate-950/60 border border-purple-500/20 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl shadow-inner">
                    {profile.avatar_symbol || '✨'}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {profile.name}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-normal">
                        {profile.archetype}
                      </span>
                    </h3>
                    <p className="text-xs text-cyan-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {profile.epoch}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Authentic Greeting:</span>
                  <p className="italic text-slate-300 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
                    "{profile.typical_greeting}"
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Speech & Rhetoric Style:</span>
                  <p className="text-slate-300 bg-slate-900/40 p-2 rounded-lg">
                    {profile.speech_style}
                  </p>
                </div>

                {profile.core_traits?.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Core Traits:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.core_traits.map((trait, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-purple-900/30 border border-purple-700/40 text-purple-200 text-[11px]">
                          {trait}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {profile.guiding_principles?.length > 0 && (
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">Guiding Principles:</span>
                    <ul className="list-disc list-inside text-slate-300 space-y-0.5">
                      {profile.guiding_principles.map((principle, i) => (
                        <li key={i}>{principle}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-end space-x-3 px-6 py-4 bg-slate-950/70 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition"
          >
            Cancel
          </button>
          {profile && (
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 disabled:opacity-50 transition flex items-center space-x-1.5 shadow-lg shadow-cyan-900/20"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Anchoring...</span>
                </>
              ) : (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Anchor Persona to Nexus</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
