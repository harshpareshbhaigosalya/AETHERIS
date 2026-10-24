import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = os.environ.get("DEBUG", "True").lower() in ("true", "1", "yes")
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")
    DEFAULT_GEMMA_MODEL = os.environ.get("DEFAULT_GEMMA_MODEL", "gemini-2.0-flash")
    # Alternate Gemma-specific hosted model IDs in Google AI Studio
    FALLBACK_MODELS = [
        "models/gemma-3-27b-it",
        "models/gemma-2-27b-it",
        "models/gemma-2-9b-it",
        "gemini-2.0-flash",
        "gemini-1.5-flash"
    ]
    OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "gemma2")
    REQUEST_TIMEOUT = int(os.environ.get("REQUEST_TIMEOUT", 15))
