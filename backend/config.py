import os
from dotenv import load_dotenv

basedir = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(basedir, ".env"))
load_dotenv(os.path.join(basedir, "..", ".env"))
# Also fallback to .env.example if user put key there
if not os.environ.get("GEMINI_API_KEY") and os.path.exists(os.path.join(basedir, ".env.example")):
    load_dotenv(os.path.join(basedir, ".env.example"))

class Config:
    PORT = int(os.environ.get("PORT", 5000))
    DEBUG = os.environ.get("DEBUG", "True").lower() in ("true", "1", "yes")
    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "").strip().strip('"').strip("'")
    DEFAULT_GEMMA_MODEL = os.environ.get("DEFAULT_GEMMA_MODEL", "models/gemini-2.5-flash")
    # Alternate Gemma-specific and flash hosted model IDs in Google AI Studio
    FALLBACK_MODELS = [
        "models/gemini-2.5-flash",
        "models/gemini-flash-latest",
        "models/gemma-4-31b-it",
        "models/gemma-4-26b-a4b-it",
        "models/gemini-3.8-flash"
    ]
    OLLAMA_BASE_URL = os.environ.get("OLLAMA_BASE_URL", "http://localhost:11434")
    OLLAMA_MODEL = os.environ.get("OLLAMA_MODEL", "gemma2")
    REQUEST_TIMEOUT = int(os.environ.get("REQUEST_TIMEOUT", 15))
