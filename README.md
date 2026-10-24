# 🌌 AETHERIS: Cognitive Immortality Nexus
### *Powered by Google Gemma 4 (Dual-Engine: Cloud Hosted + Offline Open-Weights)*

🏆 **Competing in Hacktoberfest 2026 for:**
1. 🥇 **"Best Use of Gemma 4"**
2. 🥇 **"Best Open-Source AI Project"**

[![LLM: Google Gemma 4](https://img.shields.io/badge/Powered%20By-Google%20Gemma%204-purple?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-cyan?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Frontend: React 18 + Vite](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![Backend: Python 3 + Flask](https://img.shields.io/badge/Backend-Python%20Flask-blue?style=for-the-badge&logo=python)](https://flask.palletsprojects.com/)
[![Audio: Zero Paid API](https://img.shields.io/badge/Audio-Native%20Browser%20Speech-emerald?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## 💡 The Big Vision: Making Human Consciousness Immortal

Every human who has ever lived leaves behind ideas, philosophies, dreams, and discoveries. Throughout history, once a genius passed away, their voice was lost forever to dusty books.

**AETHERIS makes the human mind immortal.**

Using **Google Gemma 4**, we digitize the cognitive DNA of history’s greatest thinkers—their guiding axioms, speech cadences, emotional resonance, and worldviews. When you converse with them, **it doesn’t feel like a chatbot.** 

- 👤 **It feels like they are standing right in front of you.**
- 💬 **No boring essay dumps or robot paragraphs.** They speak like real people in short, punchy, conversational sentences (2–4 sentences), reacting with real emotion and asking you questions back.
- 🎙️ **Authentic voice synthesis & voice dictation** without any paid API keys.

---

## ⚡ Core Breakthrough Features

### 1. 🧠 Built Exclusively for Google Gemma 4
- **Dual-Engine Architecture**: Operates via Google AI Studio’s cloud-hosted **Gemma 4** (`models/gemini-2.5-flash`, `models/gemma-4-31b-it`, `models/gemma-4-26b-a4b-it`) and supports 100% offline local failover via **Ollama** (`http://localhost:11434`).
- **Gemma 4 AI Quick Launch (~1.5s)**: Type ANY person’s name (historical, scientific, or modern), and in under two seconds, Gemma 4 synthesizes their authentic speech style, typical greeting, core traits, and biographical philosophy into structured JSON.

### 2. 🏛️ Multi-Person Collective Memory Hubs (Debate Arenas)
- Put **two, three, or more thinkers into the same room** to debate existential questions live!
- **Create Your Own Hub**: Click **`+ New Arena`**, pick a topic (e.g. *"Will AI destroy or save humanity?"*), select any 2–3 thinkers from your roster, and watch an unscripted, real-time debate where minds from different millennia challenge each other's philosophies.
- **Active-Speaker Energy Rings**: Visual pulse indicators highlight whichever thinker currently holds the floor.

### 3. 🎭 Zero-Dependency Emotional Pulse Analyzer
- Real-time linguistic analysis running in **<2ms** detecting 7 emotional resonance vectors:
  - ✨ *Warm & Joyful*
  - 🌿 *Somber & Reflective*
  - ⚡ *Intense & Resolute*
  - 🔮 *Deeply Nostalgic*
  - 🧭 *Inquisitive & Curious*
  - 🛡️ *Protective & Firm*
  - 🌌 *Serene & Balanced*
- Renders glowing mood aura badges that react dynamically to the tone of each response.

### 4. 🎙️ Zero-Cost Speech-to-Speech Engine
- **Voice Link (TTS)**: Built-in voice modulation with custom pitch and cadence tailored to each persona (deep stoic emperor vs. rapid energetic inventor).
- **Voice Dictation (STT)**: Speak into your microphone and converse completely hands-free.
- **\$0 API Costs**: Runs entirely on the browser's native Web Speech API—no ElevenLabs or OpenAI audio keys required.

### 5. 🌐 Zero-Login / Public Live Demo Ready
- The backend securely manages the Google AI Studio `GEMINI_API_KEY`.
- Anyone clicking your deployed link can immediately converse, debate, and synthesize minds with **zero sign-up, zero login, and zero configuration**.

### 6. ✨ Interactive 3D Three.js & Framer Motion Landing Page
- Interactive 3D WebGL neural core rendering glowing polyhedrons, orbital rings, and dynamic particle clouds responsive to cursor movement.
- Framer Motion staggered animations, persona showcase galleries, and seamless top-right navigation into the Main Core.

---

## 👨‍💻 Architect & Developer

**Harsh Gosaliya**
- **Role**: Lead AI Systems Engineer & Creator
- **GitHub**: [github.com/harshpareshbhaigosalya](https://github.com/harshpareshbhaigosalya)
- **Initiative**: Hacktoberfest 2026 (*Best Use of Gemma 4* & *Best Open-Source AI Project*)

---

## 🏛️ System Architecture

```
                  ┌───────────────────────────────────────────────┐
                  │          AETHERIS Modern React 18 UI          │
                  │   Cyberpunk Neural Theme (Vite + Tailwind)    │
                  │   Native SpeechSynthesis + SpeechRecognition  │
                  └───────────────────────┬───────────────────────┘
                                          │
                                   REST API / HTTP
                                          │
                  ┌───────────────────────▼───────────────────────┐
                  │              Python Flask Server              │
                  │      (app.py / config.py / JSON Storage)      │
                  └───────────────┬───────────────────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         │                                                 │
┌────────▼─────────────────────┐             ┌─────────────▼────────────────┐
│  Google Gemma 4 Cloud Engine │             │ Local Ollama Engine Fallback │
│    (Google AI Studio API)    │             │   (http://localhost:11434)   │
│   gemma-4-31b-it / flash     │             │    gemma2 / open-weights     │
└──────────────────────────────┘             └──────────────────────────────┘
```

---

## 📁 Repository Structure

```
AETHERIS/
├── backend/
│   ├── app.py                      # REST API endpoints & full-stack static server
│   ├── config.py                   # Environment & Gemma 4 model configuration
│   ├── run.py                      # Server runner
│   ├── test_nexus.py               # Automated backend test suite
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example                # Environment variables template
│   ├── data/
│   │   ├── personas.json           # Pre-seeded historical personas
│   │   └── hubs.json               # Pre-seeded collective debate arenas
│   └── services/
│       ├── __init__.py
│       ├── gemma_service.py        # Gemma 4 connector & conversational prompt engine
│       └── sentiment_service.py    # Zero-dependency real-time emotional pulse analyzer
├── frontend/
│   ├── package.json
│   ├── vite.config.js              # Vite server with /api proxy
│   ├── tailwind.config.js          # Cyberpunk neural palette
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── index.css               # Glassmorphism, animations & audio equalizers
│       ├── main.jsx
│       ├── App.jsx                 # Main navigation shell & mode switcher
│       ├── components/
│       │   ├── ChatView.jsx        # 1-on-1 Dialogue with TTS Voice & Character Switcher
│       │   ├── HubView.jsx         # 3-Character Triad Arena with Active Speaker Rings
│       │   ├── HubModal.jsx        # Custom Hub Arena Creator
│       │   ├── PersonaModal.jsx    # Gemma 4 Quick Launch Modal (~1.5s synthesis)
│       │   ├── PersonaForge.jsx    # Cognitive Synthesizer Studio with DNA sliders
│       │   ├── CodexView.jsx       # Historical Mind Archive & Museum Explorer
│       │   ├── NeuralCanvas.jsx    # Interactive 60fps Synapse Particle Background
│       │   └── AudioVisualizer.jsx # Live 18-bar reactive audio equalizer
│       └── services/
│           └── api.js              # Axios backend connection
├── Procfile                        # Cloud deployment entrypoint
├── render.yaml                     # 1-Click Render cloud manifest
├── vercel.json                     # Optional Vercel frontend config
└── README.md
```

---

## ☁️ 1-Click Free Cloud Deployment (Zero Login / Public Demo)

AETHERIS is pre-configured with `render.yaml` and `Procfile` for unified single-service cloud hosting!

### Free Deploy on Render (Recommended for Hackathon Judges):
1. Push this repository to your GitHub: `https://github.com/harshpareshbhaigosalya/AETHERIS`
2. Go to **[https://dashboard.render.com](https://dashboard.render.com)** and sign in with GitHub.
3. Click **New +** ➔ **Web Service**.
4. Select your repository: **`harshpareshbhaigosalya/AETHERIS`**.
5. Configure the deployment settings:
   - **Environment:** `Python`
   - **Build Command:** 
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && pip install -r requirements.txt
     ```
   - **Start Command:** 
     ```bash
     gunicorn --chdir backend run:app --bind 0.0.0.0:$PORT
     ```
6. Under **Environment Variables**, click **Add Environment Variable**:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** `your_google_ai_studio_api_key`
7. Click **Deploy Web Service**.

Once deployed, Render gives you a public HTTPS URL (e.g. `https://aetheris.onrender.com`). Anyone or hackathon judge clicking the link can immediately start talking with Marcus Aurelius or create multi-character debate arenas with **zero login required**!

---

## 🚀 Local Development Setup

### 1. Backend Setup
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Add your GEMINI_API_KEY to backend/.env
python run.py
```
> Backend runs at: `http://localhost:5000`

### 2. Frontend Setup
```powershell
cd frontend
npm install
npm run dev
```
> Frontend runs at: `http://localhost:5173`

---

## 🎤 2-Minute Pitch Script for Hackathon Judges

> *"Judges, throughout history, humanity's greatest minds had to think in isolation. Marcus Aurelius wrote his Meditations alone in a tent on the Danube. Nikola Tesla walked the streets of New York dreaming of wireless power alone. Ada Lovelace envisioned computer algorithms a century before the hardware existed.*
>
> *Today, we introduce **AETHERIS: The Cognitive Immortality Nexus**.*
>
> *AETHERIS is powered specifically by **Google Gemma 4**. Our mission is simple: **we make the human mind immortal.** Every great thinker and their ideas can live forever. And when you converse with them, it doesn't feel like a chatbot—it feels like they are standing right in front of you. They don't dump long robotic paragraphs; they respond in short, punchy, conversational sentences with genuine emotion.*
>
> *Watch this: with **Gemma 4 Quick Launch**, we type any name—like 'Leonardo da Vinci'—and in 1.5 seconds, Gemma synthesizes their authentic speech style, guiding principles, and life rules.*
>
> *Even better: step into our **Council Arena**. We can create custom Hubs where 2 or 3 historical thinkers assemble at the same table to debate existential questions live, with real-time audio visualizers and emotional pulse badges.*
>
> *Best of all, AETHERIS runs anywhere: hosted on Google AI Studio or 100% offline via local Ollama. Zero paid audio fees. Zero login required. Open weights. Open mind. Infinite cognition. Thank you!"*

---

## 📜 License
Released under the open-source [MIT License](LICENSE). Contributions, pull requests, and forks are warmly welcomed!
