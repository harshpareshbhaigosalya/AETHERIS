# 🌌 AETHERIS: Open-Weights Cognitive Nexus
> **Next-Generation Dual-Engine AI Platform powered by Google Gemma 4 & Local Open-Weights**

🏆 **Competing in Hacktoberfest 2026 for:**
1. **Best Use of Gemma 4**
2. **Best Open-Source AI Project**

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![Engine: Gemma 4](https://img.shields.io/badge/LLM-Gemma%204%20Dual--Engine-cyan.svg)](https://ai.google.dev/)
[![Frontend: React 18 + Vite](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Vite-61dafb.svg)](https://vitejs.dev/)
[![Backend: Python Flask](https://img.shields.io/badge/Backend-Python%20Flask-blue.svg)](https://flask.palletsprojects.com/)
[![Zero Paid Audio API](https://img.shields.io/badge/Audio-Native%20Browser%20Speech-emerald.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)

---

## ⚡ What is AETHERIS?

**AETHERIS** is an open-source cognitive platform that resurrects history's greatest intellects (Marcus Aurelius, Nikola Tesla, Ada Lovelace, and user-synthesized thinkers) into an interactive, multi-agent cognitive nexus. 

Powered by **Google Gemma 4** (with seamless dual-engine failover between Google AI Studio's hosted models and local Ollama instances), AETHERIS breaks through standard conversational AI with:

1. ⚡ **Gemma 4 AI Quick Launch (~1.5s)**: Dynamically synthesize any historical, scientific, or mythological persona into pure, structured cognition in less than two seconds.
2. 🎭 **Zero-Dependency Emotional Mood Auras**: Real-time pulse analyzer detecting emotional resonance (`Warm & Joyful`, `Somber & Reflective`, `Intense & Resolute`, `Deeply Nostalgic`, `Inquisitive & Curious`, `Protective & Firm`) with glowing reactive badges.
3. 🎙️ **Zero-Cost Speech-to-Speech Engine**: Leverages native browser Web Speech API (`SpeechSynthesis` + `webkitSpeechRecognition`) for bidirectional voice conversations with zero external paid audio APIs.
4. 🏛️ **Collective Memory Hubs (Multi-Agent Debate Arena)**: Orchestrates real-time intellectual debates between multiple historical personas simultaneously (e.g. Marcus Aurelius debating Nikola Tesla on the ethics of technological disruption).

---

## 🏛️ System Architecture

```
                  ┌───────────────────────────────────────────────┐
                  │        AETHERIS Modern React 18 UI            │
                  │   Cyberpunk Neural Dark Theme (Vite + Tailwind)│
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
│  Hosted Google Gemma 4 Engine│             │ Local Ollama Engine Fallback │
│    (Google AI Studio API)    │             │   (http://localhost:11434)   │
│   gemma-3-27b-it / flash     │             │    gemma2 / open-weights     │
└──────────────────────────────┘             └──────────────────────────────┘
```

---

## 📁 Repository Structure

```
AETHERIS/
├── backend/
│   ├── app.py                      # REST API endpoints & server logic
│   ├── config.py                   # Environment & model configuration
│   ├── run.py                      # Interactive server runner
│   ├── requirements.txt            # Python dependencies
│   ├── .env.example                # Environment variables template
│   ├── data/
│   │   ├── personas.json           # Pre-seeded historical personas
│   │   └── hubs.json               # Pre-seeded collective debate arenas
│   └── services/
│       ├── __init__.py
│       ├── gemma_service.py        # Dual-engine hosted Gemma 4 + Ollama connector
│       └── sentiment_service.py    # Zero-dependency real-time emotional pulse analyzer
├── frontend/
│   ├── package.json
│   ├── vite.config.js              # Vite server with /api proxy
│   ├── tailwind.config.js          # Cyberpunk neural palette
│   ├── postcss.config.js
│   ├── index.html
│   └── src/
│       ├── index.css               # Glassmorphism & custom scrollbar
│       ├── main.jsx
│       ├── App.jsx                 # Main navigation & shell
│       ├── components/
│       │   ├── PersonaModal.jsx    # Gemma 4 Quick Launch Modal (~1.5s synthesis)
│       │   ├── ChatView.jsx        # 1-on-1 dialogue with TTS voice & mood auras
│       │   └── HubView.jsx         # Multi-agent collective debate room
│       └── services/
│           └── api.js              # Axios backend connection
└── README.md
```

---

## 🚀 Step-by-Step Quick Start Guide

### 1. Prerequisites
- **Python 3.10+** installed
- **Node.js 18+** & **npm** installed
- (Optional) [Google AI Studio API Key](https://aistudio.google.com/) for cloud-hosted Gemma 4 models
- (Optional) [Ollama](https://ollama.com/) running locally with `ollama run gemma2`

---

### 2. Backend Setup

1. Open your terminal in the repository root:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Windows:**
     ```powershell
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - **Linux / macOS:**
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your API Key (Optional):
   ```bash
   cp .env.example .env
   ```
   Add your Google Gemini / Gemma API key to `.env`:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```
   *(Note: You can also easily enter or change your API key directly inside the UI settings modal at any time!)*

5. Start the backend server:
   ```bash
   python run.py
   ```
   Backend will start at: `http://localhost:5000`

---

### 3. Frontend Setup

1. In a new terminal tab, navigate to `frontend`:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser at: `http://localhost:5173`

4. (Optional) Build the production bundle:
   ```bash
   npm run build
   ```

---

## 🔑 How to Get a Free Google AI Studio API Key
1. Go to [https://aistudio.google.com/](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **"Get API key"** in the top navigation.
4. Click **"Create API key in new project"**.
5. Copy your generated key and paste it into the AETHERIS Settings dialog (gear icon in the top left), or into `backend/.env`.

---

## 🎤 Hackathon 2-Minute Pitch Script

> *"Judges, throughout history, humanity's greatest minds had to think in isolation. Marcus Aurelius wrote his Meditations alone in a war tent on the Danube. Nikola Tesla walked the streets of New York dreaming of wireless power alone. Ada Lovelace envisioned algorithmic computers a century before they could be physically built.*
>
> *Today, we introduce **AETHERIS: The Open-Weights Cognitive Nexus**.*
>
> *AETHERIS is not just another chatbot. It is a dual-engine cognitive platform built specifically for **Google Gemma 4**. Using Gemma's exceptional reasoning and structured instruction following, AETHERIS can synthesize any historical, scientific, or mythological persona in under 1.5 seconds—complete with authentic rhetoric styles, guiding principles, and speech cadences.*
>
> *Watch this: with one click on our 'AI Quick Launch', we enter 'Leonardo da Vinci'. In 1.5 seconds, Gemma 4 generates a fully anchored persona.*
>
> *Next, our zero-dependency **Emotional Pulse Analyzer** monitors every token in real-time, mapping dialogue to 7 resonant emotional auras with glowing visual feedback.*
>
> *Even better: notice the **Voice Link**. We require zero paid speech API keys. Using the native Web Speech API, AETHERIS speaks and listens natively in the browser with zero latency and zero subscription fees.*
>
> *Finally, step into our **Collective Memory Hub**. Watch Marcus Aurelius and Nikola Tesla engage in an unscripted, real-time philosophical debate over whether artificial intelligence will preserve or destroy human virtue.*
>
> *Best of all, AETHERIS runs anywhere: hosted on Google AI Studio or 100% offline via local Ollama. Open weights. Open mind. Infinite cognition. Thank you!"*

---

## 📜 License
Released under the open-source [MIT License](LICENSE). Contributions, pull requests, and forks are warmly welcomed!
