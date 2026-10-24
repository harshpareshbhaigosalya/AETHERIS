import os
import json
import uuid
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from config import Config
from services.gemma_service import GemmaService
from services.sentiment_service import SentimentService

app = Flask(__name__)
CORS(app)

FRONTEND_DIST = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"))

DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
PERSONAS_FILE = os.path.join(DATA_DIR, "personas.json")
HUBS_FILE = os.path.join(DATA_DIR, "hubs.json")

def load_json_data(file_path, default=None):
    if default is None:
        default = []
    if os.path.exists(file_path):
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"Error loading {file_path}: {e}")
    return default

def save_json_data(file_path, data):
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

# In-memory caches backed by JSON files
personas_db = load_json_data(PERSONAS_FILE)
hubs_db = load_json_data(HUBS_FILE)

@app.route("/api/health", methods=["GET"])
def health():
    server_key = Config.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")
    return jsonify({
        "status": "online",
        "service": "AETHERIS Cognitive Nexus",
        "gemma_engine": "Google AI Studio Gemma 4 (Cloud Hosted)",
        "has_server_api_key": bool(server_key),
        "active_personas": len(personas_db),
        "active_hubs": len(hubs_db)
    }), 200

@app.route("/api/personas", methods=["GET"])
def get_personas():
    return jsonify({"personas": personas_db}), 200

@app.route("/api/persona/create", methods=["POST"])
def create_persona():
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    if not name:
        return jsonify({"error": "Persona name is required"}), 400

    new_id = str(data.get("id") or str(uuid.uuid4())[:8])
    new_persona = {
        "id": new_id,
        "name": name,
        "archetype": data.get("archetype", "Autonomous Cognition"),
        "epoch": data.get("epoch", "Timeless"),
        "speech_style": data.get("speech_style", "Thoughtful and articulate"),
        "typical_greeting": data.get("typical_greeting", f"Salutations. I am {name}."),
        "core_traits": data.get("core_traits", ["Visionary", "Inquisitive"]),
        "guiding_principles": data.get("guiding_principles", ["Pursuit of profound insight"]),
        "catchphrases": data.get("catchphrases", []),
        "bio": data.get("bio", f"{name} stands active in the AETHERIS nexus."),
        "avatar_symbol": data.get("avatar_symbol", "✨")
    }

    # Avoid duplicate ID
    existing = [p for p in personas_db if p["id"] == new_id]
    if existing:
        personas_db.remove(existing[0])

    personas_db.append(new_persona)
    save_json_data(PERSONAS_FILE, personas_db)

    return jsonify({"persona": new_persona, "message": "Persona successfully anchored in memory"}), 201

@app.route("/api/hubs", methods=["GET"])
def get_hubs():
    return jsonify({"hubs": hubs_db}), 200

@app.route("/api/hubs/create", methods=["POST"])
def create_hub():
    data = request.get_json() or {}
    title = data.get("title", "").strip()
    topic = data.get("topic", "").strip()
    persona_ids = data.get("persona_ids", [])

    if not title or not topic:
        return jsonify({"error": "Title and topic are required to create a hub"}), 400

    new_id = "hub-" + str(uuid.uuid4())[:8]
    new_hub = {
        "id": new_id,
        "title": title,
        "topic": topic,
        "description": data.get("description", f"Council debate exploring: {topic}"),
        "persona_ids": persona_ids if isinstance(persona_ids, list) else [],
        "icon": data.get("icon", "🏛️"),
        "prompts": data.get("prompts", [
            f"What is your core stance on: {topic}?",
            "How do your philosophies clash or align on this?",
            "What is the ultimate takeaway for our world?"
        ])
    }

    hubs_db.append(new_hub)
    save_json_data(HUBS_FILE, hubs_db)

    return jsonify({"hub": new_hub, "message": "Council Arena established successfully"}), 201

@app.route("/api/persona/synthesize", methods=["POST"])
def synthesize_persona():
    """
    Synthesizes a full persona profile in pure JSON via Gemma 4.
    """
    data = request.get_json() or {}
    name = data.get("name", "").strip()
    context = data.get("context", "").strip()
    api_key = data.get("api_key", "").strip() or None
    use_local = bool(data.get("use_local", False))

    if not name:
        return jsonify({"error": "Name field is required for persona synthesis"}), 400

    try:
        profile = GemmaService.synthesize_persona(
            name=name,
            context=context,
            api_key=api_key,
            use_local=use_local
        )
        profile["id"] = profile["name"].lower().replace(" ", "-").replace(".", "")
        return jsonify({"profile": profile, "status": "success"}), 200
    except Exception as e:
        return jsonify({"error": f"Synthesis failure: {str(e)}"}), 500

@app.route("/api/chat/send", methods=["POST"])
def chat_send():
    """
    1-on-1 dialogue endpoint with Gemma 4 and real-time mood sentiment analysis.
    """
    data = request.get_json() or {}
    persona_id = data.get("persona_id")
    message = data.get("message", "").strip()
    history = data.get("history", [])
    api_key = data.get("api_key", "").strip() or None
    use_local = bool(data.get("use_local", False))

    if not persona_id or not message:
        return jsonify({"error": "persona_id and message are required"}), 400

    persona = next((p for p in personas_db if p["id"] == persona_id), None)
    if not persona:
        return jsonify({"error": f"Persona with id '{persona_id}' not found"}), 404

    try:
        result = GemmaService.generate_chat_response(
            persona=persona,
            message=message,
            history=history,
            api_key=api_key,
            use_local=use_local
        )
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"Inference error: {str(e)}"}), 500

@app.route("/api/chat/group/send", methods=["POST"])
def chat_group_send():
    """
    Multi-persona debate arena endpoint. Orchestrates dialogue across active personas.
    """
    data = request.get_json() or {}
    hub_id = data.get("hub_id")
    message = data.get("message", "").strip()
    history = data.get("history", [])
    api_key = data.get("api_key", "").strip() or None
    use_local = bool(data.get("use_local", False))

    hub = next((h for p in [personas_db] for h in hubs_db if h["id"] == hub_id), None)
    if not hub:
        return jsonify({"error": f"Hub with id '{hub_id}' not found"}), 404

    # Resolve active personas in hub
    active_personas = [p for p in personas_db if p["id"] in hub.get("persona_ids", [])]
    if not active_personas:
        # Fallback to first two personas if none match
        active_personas = personas_db[:2]

    try:
        council_responses = GemmaService.generate_group_debate(
            hub=hub,
            active_personas=active_personas,
            message=message,
            history=history,
            api_key=api_key,
            use_local=use_local
        )
        return jsonify({
            "hub_id": hub_id,
            "responses": council_responses
        }), 200
    except Exception as e:
        return jsonify({"error": f"Group deliberation error: {str(e)}"}), 500

# Serve React SPA Frontend for Unified Cloud Deployment
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(FRONTEND_DIST, path)):
        return send_from_directory(FRONTEND_DIST, path)
    index_path = os.path.join(FRONTEND_DIST, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(FRONTEND_DIST, "index.html")
    return jsonify({
        "service": "AETHERIS Cognitive Nexus API",
        "status": "online",
        "hint": "Frontend build not detected in frontend/dist. Run 'npm run build' in frontend/ to bundle UI."
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)
