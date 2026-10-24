import json
import re
import os
import warnings
warnings.filterwarnings('ignore', category=FutureWarning)
import requests
import google.generativeai as genai
from config import Config
from services.sentiment_service import SentimentService

class GemmaService:
    """
    Dual-engine cognitive nexus supporting:
    1. Google AI Studio Gemma / Gemini hosted API (models/gemma-3-27b-it, gemini-2.0-flash, gemini-1.5-flash)
    2. Local Ollama engine (http://localhost:11434)
    """

    @staticmethod
    def _clean_json_markdown(text: str) -> str:
        """Removes code fences and markdown wrapping to extract clean JSON."""
        text = text.strip()
        # Remove ```json and ```
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
        text = text.strip()
        return text

    @staticmethod
    def _format_history_for_gemini(raw_history: list) -> list:
        """
        Ensures strict alternating turns (user -> model -> user) to prevent Google API 400 errors.
        """
        formatted = []
        last_role = None

        for item in raw_history:
            role = item.get("role")
            content = item.get("content", "").strip()
            if not content:
                continue

            # Map standard roles
            if role in ("user", "human"):
                gemini_role = "user"
            else:
                gemini_role = "model"

            if gemini_role == last_role:
                # Append to previous message instead of duplicating turns
                if formatted:
                    formatted[-1]["parts"][0] += f"\n\n{content}"
            else:
                formatted.append({
                    "role": gemini_role,
                    "parts": [content]
                })
                last_role = gemini_role

        return formatted

    @classmethod
    def call_gemini(cls, system_instruction: str, prompt: str, history: list = None, api_key: str = None, model_name: str = None) -> str:
        """
        Invokes Google AI Studio Gemini API with strict timeout and fallback models.
        """
        effective_key = api_key or Config.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
        if not effective_key:
            raise ValueError("No Gemini API key provided. Please pass an API key or set GEMINI_API_KEY.")

        genai.configure(api_key=effective_key)
        
        target_model = model_name or Config.DEFAULT_GEMMA_MODEL
        candidate_models = [target_model] + [m for m in Config.FALLBACK_MODELS if m != target_model]

        last_error = None
        for candidate in candidate_models:
            try:
                # Build model with system instruction
                model = genai.GenerativeModel(
                    model_name=candidate,
                    system_instruction=system_instruction
                )
                
                if history:
                    clean_history = cls._format_history_for_gemini(history)
                    # Start chat session
                    chat = model.start_chat(history=clean_history)
                    response = chat.send_message(
                        prompt,
                        request_options={"timeout": Config.REQUEST_TIMEOUT}
                    )
                else:
                    response = model.generate_content(
                        prompt,
                        request_options={"timeout": Config.REQUEST_TIMEOUT}
                    )
                
                if response and hasattr(response, "text") and response.text:
                    return response.text.strip()
            except Exception as e:
                last_error = e
                # Try next fallback model if quota or model not found
                continue

        raise RuntimeError(f"Google AI Studio invocation failed across models: {last_error}")

    @classmethod
    def call_ollama(cls, system_instruction: str, prompt: str, history: list = None, model: str = None) -> str:
        """
        Calls local Ollama instance (http://localhost:11434).
        """
        base_url = Config.OLLAMA_BASE_URL.rstrip("/")
        target_model = model or Config.OLLAMA_MODEL

        # Convert to Ollama chat format
        messages = [{"role": "system", "content": system_instruction}]
        if history:
            for item in history:
                r = "user" if item.get("role") in ("user", "human") else "assistant"
                c = item.get("content", "").strip()
                if c:
                    messages.append({"role": r, "content": c})
        messages.append({"role": "user", "content": prompt})

        try:
            res = requests.post(
                f"{base_url}/api/chat",
                json={
                    "model": target_model,
                    "messages": messages,
                    "stream": False
                },
                timeout=Config.REQUEST_TIMEOUT
            )
            res.raise_for_status()
            data = res.json()
            return data.get("message", {}).get("content", "").strip()
        except requests.exceptions.RequestException as e:
            raise RuntimeError(f"Ollama local engine connection error: {str(e)}. Is Ollama running on {base_url}?")

    @classmethod
    def execute_prompt(cls, system_instruction: str, prompt: str, history: list = None, api_key: str = None, use_local: bool = False) -> str:
        """
        Routes the prompt to either local Ollama or hosted Google AI Studio.
        """
        if use_local:
            return cls.call_ollama(system_instruction, prompt, history)
        else:
            return cls.call_gemini(system_instruction, prompt, history, api_key=api_key)

    @classmethod
    def synthesize_persona(cls, name: str, context: str = "", api_key: str = None, use_local: bool = False) -> dict:
        """
        Synthesizes a full persona profile from just a name and optional context in pure JSON.
        """
        system_instruction = (
            "You are an expert cognitive archivist in the AETHERIS nexus. "
            "Synthesize an authentic, highly detailed persona in pure, valid JSON format. "
            "Do not include any preamble, commentary, or markdown explanation. Output only valid JSON."
        )

        user_prompt = f"""Synthesize the persona of: {name}
Additional context/epoch hint: {context or 'Historical or mythological or scientific figure'}

Return a JSON object with EXACTLY the following structure:
{{
  "name": "{name}",
  "archetype": "Brief archetype label (e.g. Stoic Emperor, Electric Visionary, Analytical Pioneer)",
  "epoch": "Time period or realm (e.g. 121–180 AD, Rome; 1856–1943; Victorian London)",
  "speech_style": "Detailed description of tone, cadence, vocabulary, rhetorical devices",
  "typical_greeting": "An authentic first-person greeting to the interlocutor",
  "core_traits": ["Trait 1", "Trait 2", "Trait 3", "Trait 4"],
  "guiding_principles": ["Principle 1", "Principle 2", "Principle 3"],
  "catchphrases": ["Quote or motto 1", "Quote or motto 2"],
  "bio": "Comprehensive 3-4 sentence biographical and philosophical overview",
  "avatar_symbol": "Single emoji or glyph representing their essence"
}}"""

        raw_output = cls.execute_prompt(system_instruction, user_prompt, api_key=api_key, use_local=use_local)
        clean_json_str = cls._clean_json_markdown(raw_output)

        try:
            parsed = json.loads(clean_json_str)
            # Ensure required fields
            parsed["name"] = parsed.get("name", name)
            parsed["archetype"] = parsed.get("archetype", "Autonomous Thinker")
            parsed["epoch"] = parsed.get("epoch", "Timeless")
            parsed["speech_style"] = parsed.get("speech_style", "Erudite and thoughtful")
            parsed["typical_greeting"] = parsed.get("typical_greeting", f"Greetings. I am {name}.")
            parsed["core_traits"] = parsed.get("core_traits", ["Insightful", "Inquisitive"])
            parsed["guiding_principles"] = parsed.get("guiding_principles", ["Pursuit of truth"])
            parsed["catchphrases"] = parsed.get("catchphrases", ["Knowledge illuminates the void."])
            parsed["bio"] = parsed.get("bio", f"{name} is a renowned figure archived in the AETHERIS cognitive nexus.")
            parsed["avatar_symbol"] = parsed.get("avatar_symbol", "✨")
            return parsed
        except Exception:
            # Fallback regex extraction or safe default
            return {
                "name": name,
                "archetype": "Cognitive Nexus Archetype",
                "epoch": context or "Timeless Era",
                "speech_style": "Eloquent, contemplative, and articulate",
                "typical_greeting": f"Greetings, seeker. I am {name}. What inquiries do you bring to our nexus today?",
                "core_traits": ["Profound Wisdom", "Visionary Insight", "Analytical Depth"],
                "guiding_principles": ["Seek truth without prejudice", "Cultivate reason"],
                "catchphrases": ["The mind is its own universe."],
                "bio": f"{name} has been synthesized into the AETHERIS memory lattice, standing ready to debate and illuminate.",
                "avatar_symbol": "🌌"
            }

    @classmethod
    def generate_chat_response(cls, persona: dict, message: str, history: list = None, api_key: str = None, use_local: bool = False) -> dict:
        """
        Generates in-character response and analyzes real-time mood sentiment.
        """
        system_instruction = (
            f"You are {persona.get('name')}, {persona.get('archetype')}, from {persona.get('epoch')}.\n"
            f"Speech Style: {persona.get('speech_style')}\n"
            f"Guiding Principles: {', '.join(persona.get('guiding_principles', []))}\n"
            f"Core Traits: {', '.join(persona.get('core_traits', []))}\n"
            f"Biography: {persona.get('bio')}\n\n"
            "DIRECTIVES:\n"
            "- Always remain completely in character as this persona.\n"
            "- Speak naturally, incorporating their authentic historical perspective, vocabulary, and worldview.\n"
            "- Do not break character or refer to yourself as an AI assistant.\n"
            "- Answer the user directly, eloquently, and engagingly."
        )

        response_text = cls.execute_prompt(
            system_instruction=system_instruction,
            prompt=message,
            history=history,
            api_key=api_key,
            use_local=use_local
        )

        mood_info = SentimentService.analyze_mood(response_text)

        return {
            "response": response_text,
            "mood": mood_info["key"],
            "mood_label": mood_info["label"],
            "mood_meta": mood_info
        }

    @classmethod
    def generate_group_debate(cls, hub: dict, active_personas: list, message: str, history: list = None, api_key: str = None, use_local: bool = False) -> list:
        """
        Generates coordinated multi-agent discussion between active personas in a Collective Hub.
        """
        responses = []
        conversation_context = history.copy() if history else []

        # If user submitted a message, add it to context
        if message:
            conversation_context.append({"role": "user", "content": message})

        # Allow up to 2-3 personas to chime in consecutively
        for persona in active_personas[:3]:
            # Build group prompt reflecting past personas' statements
            other_personas_names = [p["name"] for p in active_personas if p["id"] != persona["id"]]
            system_instruction = (
                f"You are {persona.get('name')}, {persona.get('archetype')}, participating in an intellectual council "
                f"at '{hub.get('title')}' - {hub.get('topic')}.\n"
                f"You are conversing with the user and esteemed peers: {', '.join(other_personas_names)}.\n"
                f"Speech Style: {persona.get('speech_style')}\n"
                f"Guiding Principles: {', '.join(persona.get('guiding_principles', []))}\n\n"
                "DIRECTIVES:\n"
                "- Address the inquiry and constructively build upon or critique the viewpoints of your fellow council members.\n"
                "- Stay strictly in character.\n"
                "- Keep your contribution concise and punchy (1-2 paragraphs)."
            )

            prompt = (
                f"The council is addressing: \"{message or hub.get('topic')}\". "
                "Offer your distinctive philosophy and insight to the assembly."
            )

            try:
                reply = cls.execute_prompt(
                    system_instruction=system_instruction,
                    prompt=prompt,
                    history=conversation_context[-6:],  # recent turns
                    api_key=api_key,
                    use_local=use_local
                )
            except Exception as e:
                reply = f"I observe the currents of our discussion with great interest. ({str(e)})"

            mood_info = SentimentService.analyze_mood(reply)

            # Record in conversation context so next persona can refer to it
            conversation_context.append({
                "role": "model",
                "content": f"{persona.get('name')}: {reply}"
            })

            responses.append({
                "persona_id": persona.get("id"),
                "persona_name": persona.get("name"),
                "avatar_symbol": persona.get("avatar_symbol", "🏛️"),
                "response": reply,
                "mood": mood_info["key"],
                "mood_label": mood_info["label"],
                "mood_meta": mood_info
            })

        return responses
