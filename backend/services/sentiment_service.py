import re

class SentimentService:
    """
    Zero-dependency real-time emotional pulse analyzer.
    Detects emotional tone and resonance across 7 core archetypal vectors:
    - happy: Warm & Joyful
    - sad: Somber & Reflective
    - angry: Intense & Resolute
    - nostalgic: Deeply Nostalgic
    - curious: Inquisitive & Curious
    - protective: Protective & Firm
    - default: Serene & Balanced
    """

    MOOD_METADATA = {
        "happy": {
            "key": "happy",
            "label": "Warm & Joyful",
            "icon": "✨",
            "glow": "#fbbf24",
            "border": "border-amber-400/30",
            "bg": "bg-amber-500/10"
        },
        "sad": {
            "key": "sad",
            "label": "Somber & Reflective",
            "icon": "🌿",
            "glow": "#34d399",
            "border": "border-emerald-400/30",
            "bg": "bg-emerald-500/10"
        },
        "angry": {
            "key": "angry",
            "label": "Intense & Resolute",
            "icon": "⚡",
            "glow": "#f87171",
            "border": "border-rose-400/30",
            "bg": "bg-rose-500/10"
        },
        "nostalgic": {
            "key": "nostalgic",
            "label": "Deeply Nostalgic",
            "icon": "🔮",
            "glow": "#c084fc",
            "border": "border-purple-400/30",
            "bg": "bg-purple-500/10"
        },
        "curious": {
            "key": "curious",
            "label": "Inquisitive & Curious",
            "icon": "🧭",
            "glow": "#38bdf8",
            "border": "border-cyan-400/30",
            "bg": "bg-cyan-500/10"
        },
        "protective": {
            "key": "protective",
            "label": "Protective & Firm",
            "icon": "🛡️",
            "glow": "#818cf8",
            "border": "border-indigo-400/30",
            "bg": "bg-indigo-500/10"
        },
        "default": {
            "key": "default",
            "label": "Serene & Balanced",
            "icon": "🌌",
            "glow": "#a855f7",
            "border": "border-violet-400/30",
            "bg": "bg-violet-500/10"
        }
    }

    LEXICON = {
        "happy": [
            "joy", "glad", "delight", "celebrat", "wonder", "triumph", "excite", "ecsta", "laugh", 
            "smile", "bliss", "pleas", "cherish", "optimis", "prosper", "radiant", "love", "hope", 
            "brilliant", "magnificent", "splendid", "victory", "bless", "thrill", "euphor"
        ],
        "sad": [
            "grief", "sorrow", "mourn", "melanchol", "loss", "trag", "tear", "despair", "ache", 
            "regret", "suffer", "weary", "pain", "darkness", "hollow", "broken", "lonel", "bleak", 
            "doom", "wretched", "stoic", "grave", "somber", "quietly enduring"
        ],
        "angry": [
            "rage", "fury", "outrage", "wrath", "indign", "injustice", "tyran", "betray", "strike", 
            "crush", "battle", "fierce", "resolute", "defiance", "vehement", "unforgiving", "corrupt", 
            "hostil", "spite", "scorn", "furious", "clash", "rebel", "stand firm"
        ],
        "nostalgic": [
            "remember", "memory", "ancient", "epoch", "reminisc", "bygone", "past", "yesterday", 
            "ancestor", "long ago", "history", "youth", "relic", "echo", "legacy", "forgotten", 
            "faded", "timeless", "heritage", "cherished past"
        ],
        "curious": [
            "why", "how", "what if", "ponder", "inquire", "explore", "mystery", "fascinat", "hypothes", 
            "investigat", "question", "seek", "discover", "unravel", "intrigue", "speculat", "puzzle", 
            "experiment", "wondering", "probe", "examine"
        ],
        "protective": [
            "protect", "shield", "guard", "defend", "preserve", "safeguard", "shelter", "duty", 
            "oath", "vigil", "honor", "sanctuary", "secure", "fortify", "caution", "warn", "watch over",
            "stand guard", "armor"
        ]
    }

    @classmethod
    def analyze_mood(cls, text: str) -> dict:
        """
        Analyzes the input text and returns the dominant emotional resonance and metadata.
        """
        if not text or not isinstance(text, str):
            return cls.MOOD_METADATA["default"]

        normalized = text.lower()
        # Clean punctuation
        words = re.findall(r'\b\w+\b', normalized)

        scores = {mood: 0 for mood in cls.LEXICON}

        for mood, roots in cls.LEXICON.items():
            for root in roots:
                # Count substring matches in word stems
                matches = sum(1 for w in words if root in w)
                if matches > 0:
                    scores[mood] += matches
                # Check for phrase occurrences in raw text
                if " " in root and root in normalized:
                    scores[mood] += 2

        # Punctuation heuristics
        if "?" in text:
            scores["curious"] += 2
        if "!" in text:
            scores["angry"] += 1
            scores["happy"] += 1

        best_mood = max(scores, key=scores.get)
        if scores[best_mood] == 0:
            best_mood = "default"

        return cls.MOOD_METADATA.get(best_mood, cls.MOOD_METADATA["default"])
