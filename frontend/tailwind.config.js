/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#030712',
          900: '#0f172a',
          850: '#0b1120',
          800: '#1e293b'
        },
        nexus: {
          violet: '#a855f7',
          cyan: '#06b6d4',
          pink: '#ec4899',
          amber: '#f59e0b',
          emerald: '#10b981'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(168, 85, 247, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(6, 182, 212, 0.6)' }
        }
      }
    },
  },
  plugins: [],
}
