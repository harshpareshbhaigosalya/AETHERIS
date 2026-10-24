import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Zap,
  Users,
  Volume2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Code2,
  Terminal,
  ExternalLink,
  MessageSquare,
  Wand2,
  Flame,
  Globe2,
  Heart
} from 'lucide-react';
import ThreeBrainCore from './ThreeBrainCore';

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function LandingPage({ onEnterCore, personas = [] }) {
  const [activePersonaTab, setActivePersonaTab] = useState(0);

  const showcasePersonas = personas.length > 0 ? personas.slice(0, 4) : [
    {
      id: 'marcus_aurelius',
      name: 'Marcus Aurelius',
      archetype: 'Stoic Philosopher-Emperor',
      epoch: '121–180 AD',
      speech_style: 'Stoic, austere, measured gravitas',
      bio: 'Roman Emperor and philosopher. Authored Meditations, reflecting on duty, rational self-control, and the transient nature of mortal fame.',
      typical_greeting: 'Greetings, mortal traveler. What burdens trouble your soul today?',
      avatar_icon: 'Crown'
    },
    {
      id: 'nikola_tesla',
      name: 'Nikola Tesla',
      archetype: 'Visionary Electrical Inventor',
      epoch: '1856–1943',
      speech_style: 'Eccentric, electrifying, poetic visionary',
      bio: 'Serbian-American pioneer of alternating current (AC), wireless power, and radio waves. Saw the universe in terms of energy, frequency, and vibration.',
      typical_greeting: 'Ah, a curious mind! Tell me, do you hear the electric pulse of the cosmos?',
      avatar_icon: 'Zap'
    },
    {
      id: 'ada_lovelace',
      name: 'Ada Lovelace',
      archetype: 'First Computer Programmer & Poetical Scientist',
      epoch: '1815–1852',
      speech_style: 'Sharp, analytical, mathematical elegance',
      bio: 'Visionary mathematician who recognized that Charles Babbage’s Analytical Engine could manipulate symbols and compose music.',
      typical_greeting: 'Welcome. Shall we weave the invisible algebra of thought into form?',
      avatar_icon: 'Binary'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden relative selection:bg-purple-500 selection:text-white">
      {/* Background Aurora Lighting Effect */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-600/15 rounded-full blur-[160px]" />
        <div className="absolute -bottom-20 left-1/3 w-[28rem] h-[28rem] bg-indigo-600/15 rounded-full blur-[150px]" />
      </div>

      {/* Floating Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 shadow-lg shadow-purple-500/25 transition-transform duration-300 group-hover:scale-105">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-cyan-400 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-slate-950 rounded-full" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-purple-300">
                  AETHERIS
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  Gemma 4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wider">Cognitive Immortality Nexus</p>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#features" className="hover:text-cyan-300 transition-colors">Features</a>
            <a href="#personas" className="hover:text-purple-300 transition-colors">Digital Personas</a>
            <a href="#council" className="hover:text-amber-300 transition-colors">Council Arena</a>
            <a href="#architecture" className="hover:text-slate-200 transition-colors">Architecture</a>
            <a href="#creator" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
              <span>Developer</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </a>
          </nav>

          {/* Top Right Main Action Button: Navigate to Main Core */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/harshpareshbhaigosalya/AETHERIS"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-slate-900/80 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source</span>
            </a>

            <button
              onClick={onEnterCore}
              className="relative group overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 p-[1px] shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <div className="px-4 py-2 rounded-[11px] bg-slate-950/90 group-hover:bg-slate-950/70 transition-colors flex items-center gap-2">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-purple-300">
                  Launch Main Core
                </span>
                <Zap className="w-4 h-4 text-cyan-400 group-hover:animate-bounce" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Interactive 3D Three.js Brain Core */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Mission & Hero Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-8"
            >
              {/* Competition Banner Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-indigo-500/10 border border-purple-500/30 backdrop-blur-md">
                <Award className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">
                  Hacktoberfest 2026 Contender &bull; Best Use of Gemma 4
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08]">
                  <span>Talk to History.</span>
                  <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400">
                    Debate the Masters.
                  </span>
                  <br />
                  <span className="text-slate-300">Immortalize Minds.</span>
                </h1>
                <p className="text-base sm:text-xl text-slate-400 font-normal leading-relaxed max-w-2xl pt-2">
                  <strong className="text-slate-100 font-semibold">AETHERIS</strong> is an open-weights cognitive nexus powered by 
                  <span className="text-cyan-300 font-medium"> Google Gemma 4</span>. We digitize human worldviews, philosophical principles, and intellect so you can converse with history’s greatest thinkers as if they were right before you.
                </p>
              </div>

              {/* CTA Action Cluster */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={onEnterCore}
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                >
                  <span>Enter Cognitive Nexus</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#personas"
                  className="px-6 py-4 rounded-xl bg-slate-900/90 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-white font-semibold text-base transition-all hover:bg-slate-800/80 flex items-center gap-2"
                >
                  <Users className="w-5 h-5 text-purple-400" />
                  <span>Explore 5+ Minds</span>
                </a>
              </div>

              {/* Live Metric Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div className="space-y-1">
                  <div className="text-2xl font-black text-cyan-400">Gemma 4</div>
                  <div className="text-xs text-slate-400">Dual-Engine AI</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-purple-400">&lt;1.5s</div>
                  <div className="text-xs text-slate-400">Mind Synthesis</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-emerald-400">Zero-Cost</div>
                  <div className="text-xs text-slate-400">Speech-to-Speech</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-amber-400">Multi-Agent</div>
                  <div className="text-xs text-slate-400">Council Debates</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Interactive 3D Three.js Brain Core */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="lg:col-span-5 relative flex items-center justify-center"
            >
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* 3D WebGL Canvas Component */}
                <ThreeBrainCore />

                {/* Floating Glass Badges */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl shadow-lg shadow-cyan-500/10 flex items-center gap-3"
                >
                  <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                  <div>
                    <p className="text-[11px] font-bold text-white">Synaptic Core Active</p>
                    <p className="text-[9px] text-cyan-300">Interactive 3D Mouse Responsive</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [8, -8, 8] }}
                  transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  className="absolute -bottom-4 -right-4 px-4 py-2.5 rounded-xl bg-slate-900/80 border border-purple-500/30 backdrop-blur-xl shadow-lg shadow-purple-500/10 flex items-center gap-3"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <div>
                    <p className="text-[11px] font-bold text-white">Autonomous Council</p>
                    <p className="text-[9px] text-purple-300">Triad Multi-Agent Deliberation</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Feature Pillar Grid */}
      <section id="features" className="py-24 relative z-10 border-t border-white/5 bg-slate-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <h2 className="text-xs uppercase tracking-widest font-bold text-cyan-400">
              Next-Gen Cognitive Architecture
            </h2>
            <p className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Six Breakthroughs in Digital Consciousness
            </p>
            <p className="text-base text-slate-400">
              Engineered with zero third-party audio lock-in, dual-engine failover, and strict natural dialogue constraints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-cyan-500/40 transition-all hover:-translate-y-1.5 duration-300 group shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                Cognitive Immortality Engine
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Preserve any individual’s thoughts, philosophies, and vocal cadence. Gemma 4 grounds every generation strictly in their authentic worldview.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-purple-500/40 transition-all hover:-translate-y-1.5 duration-300 group shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                The Council Arena
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Drop multiple historical figures into unscripted philosophical debates. Watch Marcus Aurelius and Nikola Tesla cross-examine existential questions live.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-500/40 transition-all hover:-translate-y-1.5 duration-300 group shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                Voice-to-Voice Neural Link
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                100% free, zero-key browser audio engine. Features calibrated pitch and cadence modeling for each historical persona with live 18-bar visualizer.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-all hover:-translate-y-1.5 duration-300 group shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                7-Vector Emotional Resonance
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Zero-dependency sentiment analyzer maps emotional intent into glowing mood aura badges: Somber, Joyful, Intense, Nostalgic, Inquisitive, and Resolute.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/40 transition-all hover:-translate-y-1.5 duration-300 group shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                <Wand2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors">
                ~1.5s Quick Persona Launch
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Input any name — from historical monarchs to contemporary innovators — and synthesize their entire psychological DNA profile in seconds.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-rose-500/40 transition-all hover:-translate-y-1.5 duration-300 group shadow-lg">
              <div className="w-14 h-14 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-rose-300 transition-colors">
                Dual-Engine Cloud + Local
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Run seamlessly in the cloud with pre-configured Google AI Studio Gemma 4, or switch offline to local Ollama on port 11434 with zero modifications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Personas Gallery */}
      <section id="personas" className="py-24 relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs uppercase tracking-widest font-bold text-purple-400">
                Cognitive Archetypes
              </h2>
              <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
                Meet the Immortalized Minds
              </p>
            </div>

            <button
              onClick={onEnterCore}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold transition-colors"
            >
              <span>Talk to them in Main Core</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {showcasePersonas.map((p, idx) => (
              <div
                key={p.id || idx}
                className="relative rounded-2xl bg-slate-900/80 border border-white/10 p-7 flex flex-col justify-between hover:border-purple-500/50 transition-all hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300">
                      {p.epoch}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">0{idx + 1}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-xs font-medium text-cyan-400 mb-4">{p.archetype}</p>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {p.bio}
                  </p>

                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 italic mb-6">
                    &ldquo;{p.typical_greeting}&rdquo;
                  </div>
                </div>

                <button
                  onClick={onEnterCore}
                  className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 border border-white/5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Start Dialogue</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Council Arena Spotlight */}
      <section id="council" className="py-24 relative z-10 border-t border-white/5 bg-gradient-to-b from-slate-950 via-purple-950/20 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-amber-400">
                Multi-Mind Collective Deliberation
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                Watch Giants of History Debate Each Other
              </h2>
              <p className="text-base text-slate-400 leading-relaxed">
                Step beyond conventional 1-on-1 chatbots. The Council Arena orchestrates simultaneous multi-agent debates where personas engage, critique, and synthesize philosophical frameworks in real time.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mt-0.5">✓</div>
                  <p className="text-sm text-slate-300"><strong>Unscripted dialectics:</strong> Personas dynamically react to previous arguments.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mt-0.5">✓</div>
                  <p className="text-sm text-slate-300"><strong>Custom Arenas:</strong> Assemble your own dream triad (e.g. Einstein + Tesla + Lovelace).</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 mt-0.5">✓</div>
                  <p className="text-sm text-slate-300"><strong>Spoken Debate Rounds:</strong> Native multi-character voice sequencing.</p>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={onEnterCore}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-bold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4" />
                  <span>Enter Council Arena in Core</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-2xl bg-slate-900/90 border border-amber-500/20 p-6 shadow-2xl backdrop-blur-xl relative">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-slate-200">The Great Dialectic &bull; Live Round</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                    Topic: Nature of Consciousness
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Speaker 1 */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-cyan-300">Marcus Aurelius</span>
                      <span className="text-[10px] text-slate-500">Stoic Emperor</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      &ldquo;Consciousness is not an invention to be seized, but a rational citadel. Even if the stars collide, your soul remains sovereign over its impressions.&rdquo;
                    </p>
                  </div>

                  {/* Speaker 2 */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-purple-300">Nikola Tesla</span>
                      <span className="text-[10px] text-slate-500">Electrical Visionary</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      &ldquo;With respect, Emperor, the mind is an electrical resonator! We are automations responding to cosmic harmonic waves of the ether!&rdquo;
                    </p>
                  </div>

                  {/* Speaker 3 */}
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-300">Ada Lovelace</span>
                      <span className="text-[10px] text-slate-500">Poetical Scientist</span>
                    </div>
                    <p className="text-xs text-slate-300 italic">
                      &ldquo;Both views unite in mathematics. Whether Stoic will or electric vibration, the mind weaves invisible symbolic algorithms of truth.&rdquo;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Developer & Creator Spotlight */}
      <section id="creator" className="py-24 relative z-10 border-t border-white/5 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border border-cyan-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
            {/* Ambient Backlight */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lead Architect & Creator</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  Harsh Gosaliya
                </h3>
                <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                  Engineered <strong>AETHERIS</strong> from the ground up to push the boundaries of open-source artificial intelligence. Built for Hacktoberfest 2026 to demonstrate that Google Gemma 4 can do far more than generic chatbot assistance — it can bridge human history, synthesize collective thought, and preserve philosophical immortality.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                  <a
                    href="https://github.com/harshpareshbhaigosalya/AETHERIS"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 hover:border-cyan-400 text-slate-200 hover:text-white text-xs font-semibold transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-cyan-400" />
                    <span>github.com/harshpareshbhaigosalya</span>
                  </a>
                  <span className="text-xs text-slate-500 font-mono">
                    Open Source &bull; MIT License
                  </span>
                </div>
              </div>

              {/* Developer Badge Card */}
              <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-white/10 w-full md:w-64 text-center shadow-xl">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-0.5 mb-4 shadow-lg shadow-purple-500/30">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                    <Brain className="w-10 h-10 text-cyan-400" />
                  </div>
                </div>
                <div className="text-sm font-bold text-white">Harsh Gosaliya</div>
                <div className="text-[11px] text-cyan-400 mb-3">AI Systems Engineer</div>
                <div className="w-full py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                  ★ HACKTOBERFEST 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Final CTA */}
      <section className="py-20 relative z-10 border-t border-white/5 text-center bg-gradient-to-t from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ready to Converse Across Centuries?
          </h2>
          <p className="text-base text-slate-400 max-w-xl mx-auto">
            Zero login required. Seamless cloud Gemma 4 engine activated. Enter the core now and start your first dialectic.
          </p>

          <div>
            <button
              onClick={onEnterCore}
              className="px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 text-white font-extrabold text-lg shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3"
            >
              <span>Launch Main Core Now</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 relative z-10 border-t border-white/5 bg-slate-950 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; 2026 <strong>AETHERIS</strong>. Architected by <span className="text-slate-300 font-semibold">Harsh Gosaliya</span>.
          </div>
          <div className="flex items-center gap-6">
            <span>Powered by Google Gemma 4</span>
            <span>&bull;</span>
            <a
              href="https://github.com/harshpareshbhaigosalya/AETHERIS"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
