# 🌌 AETHERIS: Cognitive Immortality Nexus
### *Powered by Google Gemma 4 • The Open-Weights Mind Preservation Engine*

[![LLM: Google Gemma 4](https://img.shields.io/badge/Engine-Google%20Gemma%204-7c3aed?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Hacktoberfest: 2026 Contender](https://img.shields.io/badge/Hacktoberfest-2026%20Contender-f97316?style=for-the-badge&logo=hacktoberfest)](https://hacktoberfest.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-06b6d4?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Stack: React 18 + Vite + Three.js](https://img.shields.io/badge/Frontend-React%2018%20%2B%20Three.js-3b82f6?style=for-the-badge&logo=react)](https://vitejs.dev/)
[![Backend: Python Flask](https://img.shields.io/badge/Backend-Python%20Flask-10b981?style=for-the-badge&logo=python)](https://flask.palletsprojects.com/)

---

## 🏆 Hacktoberfest 2026 Nominations
- 🥇 **"Best Use of Gemma 4"** — Deep dual-engine integration using Google AI Studio Gemma 4 cloud & offline Ollama open-weights.
- 🥇 **"Best Open-Source AI Project"** — Complete end-to-end cognitive immortality platform with zero paid API dependencies.

---

## 💡 What is AETHERIS in Plain English?

Throughout history, once a great thinker died, their voice was trapped in books. 

**AETHERIS makes the human mind immortal.** 

Powered by **Google Gemma 4**, AETHERIS digitizes a thinker’s ideas, speech cadence, and worldview into living, speaking digital minds. When you converse with them, **it does not feel like a chatbot**—it feels like they are standing right in front of you.

- 💬 **No Essay Dumps**: Responses are short, punchy, conversational dialogues (2–4 sentences), just like real humans speak.
- 🏛️ **Multi-Mind Debates**: Drop 2 or 3 thinkers into an arena to debate existential questions live and unscripted.
- 🎙️ **Zero-Cost Voice**: Full speech-to-speech engine running entirely inside your browser for $0.
- 🌐 **Zero-Login Ready**: The cloud backend securely manages API keys so anyone clicking the link can use the platform instantly.

---

## ⚡ Generic Chatbots vs. AETHERIS

| Feature | Generic AI Chatbots | 🌌 AETHERIS Nexus |
| :--- | :--- | :--- |
| **Response Style** | 5-paragraph robotic lecture dumps | **Natural 2–4 sentence human dialogue** |
| **Conversation** | 1-on-1 isolated silos | **Multi-Mind Council Arenas (3+ thinkers live)** |
| **Mind Synthesis** | Generic pre-canned prompts | **~1.5s Gemma 4 Cognitive DNA Forge** |
| **Voice Engine** | Requires expensive paid API keys | **100% Free browser Speech-to-Speech ($0)** |
| **Emotion** | Flat, robotic text | **7-Vector Real-Time Emotional Mood Badges** |
| **Execution** | Cloud vendor lock-in | **Dual-Engine (Google Cloud + 100% Offline Local)** |
| **Public Access** | Forced logins, paywalls, sign-ups | **Zero-Login Public Access for Hackathon Judges** |

---

## 🚀 Key Features

### 1. 🧠 Built Exclusively for Google Gemma 4
- **Dual-Engine Flexibility**: Runs hosted in the cloud via Google AI Studio (`models/gemini-2.5-flash`, `models/gemma-4-31b-it`, `models/gemma-4-26b-a4b-it`) with automatic fallback to offline local **Ollama** (`http://localhost:11434`).
- **Gemma 4 Fast Launch (~1.5s)**: Type any name and Gemma 4 synthesizes their speech cadence, guiding principles, and bio into pure structured JSON in seconds.

### 2. 🏛️ The Council Arena (Multi-Person Debates)
- Stage real-time dialectics between historical minds (e.g. *Marcus Aurelius vs. Nikola Tesla vs. Ada Lovelace*).
- Click **`+ New Arena`** to create custom arenas with any topic and debater lineup.
- Active speaker glowing rings highlight whichever mind currently holds the floor.

### 3. 🎙️ $0 Speech-to-Speech Engine
- **Voice Link (TTS)**: Native browser speech synthesis with custom pitch and cadence modeling for each historical persona.
- **Voice Dictation (STT)**: Microphone speech recognition allows hands-free conversation.
- **Equalizer**: Cyberpunk 18-bar animated audio visualizer reacts live to spoken audio.

### 4. 🎭 7-Vector Emotional Resonance
- Real-time zero-dependency sentiment analyzer running in **<2ms** detecting:
  - 🌿 *Somber & Reflective* • ✨ *Warm & Joyful* • ⚡ *Intense & Resolute*
  - 🔮 *Deeply Nostalgic* • 🧭 *Inquisitive & Curious* • 🛡️ *Protective & Firm*
- Renders glowing mood aura badges that react dynamically to the tone of each response.

### 5. ✨ Interactive 3D Three.js & Framer Motion Landing Page
- Interactive 3D WebGL neural core with rotating polyhedrons, orbital gyro-rings, and particle clouds responsive to cursor movement.
- Top-right **"Launch Main Core"** button transitions seamlessly into the platform.

---

## 👨‍💻 Architect & Developer

**Harsh Gosaliya**
- **Role**: Lead AI Systems Engineer & Creator
- **GitHub**: [@harshpareshbhaigosalya](https://github.com/harshpareshbhaigosalya)
- **Repository**: [https://github.com/harshpareshbhaigosalya/AETHERIS](https://github.com/harshpareshbhaigosalya/AETHERIS)
- **Initiative**: Hacktoberfest 2026 (*Best Use of Gemma 4* & *Best Open-Source AI Project*)

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│               AETHERIS React 18 Cyberpunk UI                │
│    (Three.js 3D Core • Framer Motion • Native Speech API)   │
└──────────────────────────────┬──────────────────────────────┘
                               │
                        REST API / HTTP
                               │
┌──────────────────────────────▼──────────────────────────────┐
│                  Python 3 Flask Backend                     │
│        (Persona Engine • Mood Pulse • Hub Debates)          │
└───────────────┬──────────────────────────────┬──────────────┘
                │                              │
┌───────────────▼──────────────┐ ┌─────────────▼──────────────┐
│  Google Gemma 4 Cloud Engine │ │ Local Ollama Engine Backup │
│   (Google AI Studio API)     │ │  (http://localhost:11434)  │
└──────────────────────────────┘ └────────────────────────────┘
```

---

## ⚡ Quick Start (Run Locally in 2 Minutes)

### Prerequisites
- Python 3.9+
- Node.js 18+

### 1. Backend Setup
```bash
cd backend
python -m venv venv

# Windows:
.\venv\Scripts\activate
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
cp .env.example .env
# Set your GEMINI_API_KEY in backend/.env
python run.py
```
> Backend runs at: `http://localhost:5000`

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
> Frontend runs at: `http://localhost:5173`

---

## 🌐 1-Click Cloud Deployment (Render / Railway)

AETHERIS is pre-configured for single-service full-stack deployment:
1. Connect your repository (`harshpareshbhaigosalya/AETHERIS`) on [Render](https://dashboard.render.com).
2. **Build Command**:
   ```bash
   pip install -r backend/requirements.txt && cd frontend && npm install && npm run build && cd ..
   ```
3. **Start Command**:
   ```bash
   python backend/run.py
   ```
4. **Environment Variables**:
   - `GEMINI_API_KEY`: *(your Google AI Studio key)*
   - `PORT`: `5000`

---

## 🎤 2-Minute Hackathon Pitch Script

> *"Judges, throughout history, humanity's greatest minds had to think in isolation. Marcus Aurelius wrote his Meditations alone in a tent. Nikola Tesla envisioned alternating current alone. Ada Lovelace imagined computer algorithms a century before the hardware existed.*
>
> *Today, we introduce **AETHERIS: The Cognitive Immortality Nexus**.*
>
> *Built exclusively for **Google Gemma 4**, our mission is simple: **we make the human mind immortal.** Every great thinker’s ideas, speech cadence, and philosophy live forever. When you converse with them, they don’t dump robotic essay paragraphs—they speak in natural, punchy sentences with genuine emotion and voice.*
>
> *Even better: step into our **Council Arena**, where 2 or 3 historical thinkers assemble at the same table to debate existential questions live and unscripted.*
>
> *Runs anywhere: hosted via Google AI Studio or 100% offline via local Ollama. Zero paid audio fees. Zero logins required. Open weights. Infinite cognition. Thank you!"*

---

## 📜 License
Released under the [MIT License](LICENSE). Contributions and stars are warmly welcomed!
