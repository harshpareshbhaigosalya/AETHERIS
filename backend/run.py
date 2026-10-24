import sys
import os

# Add current directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app
from config import Config

if __name__ == "__main__":
    print("================================================================")
    print("      AETHERIS: Open-Weights Cognitive Nexus (Gemma 4)")
    print("================================================================")
    print(f"[*] Server listening at: http://localhost:{Config.PORT}")
    print(f"[*] Health Check URL:   http://localhost:{Config.PORT}/api/health")
    print(f"[*] Gemma API Model:    {Config.DEFAULT_GEMMA_MODEL}")
    print(f"[*] Local Ollama:       {Config.OLLAMA_BASE_URL} ({Config.OLLAMA_MODEL})")
    print("================================================================")
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
