import React, { useState } from 'react';
import { X, Users, Sparkles, Check, Plus, Shield, MessageSquare, AlertCircle } from 'lucide-react';

export default function HubModal({ isOpen, onClose, personas, onHubCreated }) {
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [selectedPersonaIds, setSelectedPersonaIds] = useState([]);
  const [icon, setIcon] = useState('🏛️');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const icons = ['🏛️', '⚡', '🔮', '🌌', '⚔️', '🧠', '✨', '🌍', '🔥', '💡'];

  const togglePersona = (id) => {
    if (selectedPersonaIds.includes(id)) {
      setSelectedPersonaIds(prev => prev.filter(pId => pId !== id));
    } else {
      if (selectedPersonaIds.length >= 3) {
        setError('A council chamber seats up to 3 active thinkers for optimal debate.');
        return;
      }
      setError('');
      setSelectedPersonaIds(prev => [...prev, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim()) {
      setError('Please provide both a council title and a debate topic.');
      return;
    }
    if (selectedPersonaIds.length < 2) {
      setError('Please select at least 2 personas to debate.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/hubs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          topic: topic.trim(),
          persona_ids: selectedPersonaIds,
          icon: icon
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create council hub');
      }

      onHubCreated(data.hub);
      onClose();
      setTitle('');
      setTopic('');
      setSelectedPersonaIds([]);
    } catch (err) {
      setError(err.message || 'Error creating council arena.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-950/50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Glowing top line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                Create Council Debate Arena
              </h2>
              <p className="text-xs text-slate-400">
                Pick 2 or 3 thinkers and set a grand proposition for them to debate.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Arena Title */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Arena Title <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. The Silicon Ethics Symposium, Quantum vs Consciousness"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-xs outline-none transition"
            />
          </div>

          {/* Debate Topic */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Debate Topic / Proposition <span className="text-cyan-400">*</span>
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Will artificial intelligence enhance or extinguish human virtue?"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-cyan-400 text-slate-100 text-xs outline-none transition resize-none"
            />
          </div>

          {/* Icon Selector */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Arena Sigil
            </label>
            <div className="flex items-center space-x-2">
              {icons.map(ic => (
                <button
                  type="button"
                  key={ic}
                  onClick={() => setIcon(ic)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition ${
                    icon === ic ? 'bg-cyan-500/20 border border-cyan-400 scale-110' : 'bg-slate-950 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {ic}
                </button>
              ))}
            </div>
          </div>

          {/* Persona Roster Picker (2 to 3) */}
          <div>
            <label className="block font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
              <span>Select 2 or 3 Council Debaters <span className="text-cyan-400">*</span></span>
              <span className="text-cyan-400 font-mono text-[11px]">{selectedPersonaIds.length} / 3 Selected</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
              {personas.map(p => {
                const isSelected = selectedPersonaIds.includes(p.id);
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => togglePersona(p.id)}
                    className={`p-2.5 rounded-xl text-left border transition flex items-center space-x-2.5 ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/50 text-white shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <span className="text-xl">{p.avatar_symbol || '🏛️'}</span>
                    <div className="overflow-hidden flex-1">
                      <div className="font-semibold text-xs truncate text-slate-200">{p.name}</div>
                      <div className="text-[10px] text-slate-400 truncate">{p.archetype}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !title.trim() || !topic.trim() || selectedPersonaIds.length < 2}
              className="px-5 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 disabled:opacity-40 transition shadow-lg shadow-cyan-950/40"
            >
              {isSubmitting ? 'Assembling...' : 'Establish Arena'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
