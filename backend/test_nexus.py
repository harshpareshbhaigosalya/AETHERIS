import sys
import os

# Add backend directory to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app import app
from services.sentiment_service import SentimentService
from services.gemma_service import GemmaService

def test_endpoints():
    print("[*] Testing AETHERIS backend integrity...")
    client = app.test_client()

    # 1. Health check
    res = client.get("/api/health")
    assert res.status_code == 200, f"Health check failed: {res.status_code}"
    health_data = res.get_json()
    print(f" [+] Health Check: PASS (status={health_data.get('status')})")

    # 2. Personas list
    res = client.get("/api/personas")
    assert res.status_code == 200
    personas = res.get_json().get("personas", [])
    assert len(personas) >= 3, f"Expected at least 3 seeded personas, got {len(personas)}"
    print(f" [+] Pre-seeded Personas: PASS ({len(personas)} personas verified)")

    # 3. Hubs list
    res = client.get("/api/hubs")
    assert res.status_code == 200
    hubs = res.get_json().get("hubs", [])
    assert len(hubs) >= 3, f"Expected at least 3 seeded hubs, got {len(hubs)}"
    print(f" [+] Pre-seeded Hubs: PASS ({len(hubs)} collective hubs verified)")

    # 4. Sentiment Service
    test_phrases = {
        "happy": "This is a joyous day of triumphant discovery and celebration!",
        "sad": "My heart bears heavy grief, sorrow, and solemn tears for what was lost.",
        "angry": "We must strike against the tyranny of corruption with fierce fury!",
        "curious": "Why does the quantum vacuum fluctuate, and what if time is non-linear?",
        "protective": "I swear an oath to safeguard and defend our people with an impenetrable shield.",
        "nostalgic": "I remember the ancient epoch long ago, where memory whispers like an echo."
    }

    for expected_mood, text in test_phrases.items():
        mood_meta = SentimentService.analyze_mood(text)
        assert mood_meta["key"] == expected_mood, f"Expected {expected_mood}, got {mood_meta['key']}"
    print(f" [+] Sentiment Pulse Analyzer: PASS (6/6 emotional vectors verified)")

    # 5. Alternating history turn formatter
    raw_history = [
        {"role": "user", "content": "Hello"},
        {"role": "user", "content": "Are you there?"},
        {"role": "model", "content": "Yes, I am."},
        {"role": "model", "content": "How may I help?"},
        {"role": "user", "content": "Tell me a story."}
    ]
    formatted = GemmaService._format_history_for_gemini(raw_history)
    roles = [f["role"] for f in formatted]
    assert roles == ["user", "model", "user"], f"Strict alternating turns violated: {roles}"
    print(f" [+] Gemini Turn Alternator: PASS (Prevented API 400 turn conflict)")

    print("\n[SUCCESS] ALL BACKEND INTEGRITY TESTS PASSED SUCCESSFULLY!")

if __name__ == "__main__":
    test_endpoints()
