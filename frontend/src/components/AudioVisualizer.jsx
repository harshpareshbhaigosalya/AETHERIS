import React from 'react';

export default function AudioVisualizer({ isActive, mode = 'speaking' }) {
  if (!isActive) return null;

  const barCount = 18;
  const isVoiceIn = mode === 'listening';

  return (
    <div className="flex items-center space-x-1 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 backdrop-blur-md shadow-lg shadow-cyan-950/40">
      <span className={`w-2 h-2 rounded-full mr-1.5 ${isVoiceIn ? 'bg-rose-500 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
      <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase mr-2">
        {isVoiceIn ? 'Neural Voice Input' : 'Voice Link Active'}
      </span>
      <div className="flex items-center space-x-0.5 h-4">
        {[...Array(barCount)].map((_, i) => {
          const delay = (i % 6) * 0.12;
          const duration = 0.5 + (i % 4) * 0.2;
          return (
            <div
              key={i}
              className={`w-1 rounded-full ${
                isVoiceIn 
                  ? 'bg-gradient-to-t from-rose-500 to-amber-400' 
                  : 'bg-gradient-to-t from-cyan-500 to-purple-400'
              }`}
              style={{
                animation: `bounceHeight ${duration}s ease-in-out infinite alternate`,
                animationDelay: `${delay}s`,
                height: `${25 + (Math.sin(i) * 20 + 20)}%`
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
