from flask import Flask, request, send_from_directory
from flask_cors import CORS, cross_origin

from models.api import convert_text_to_audio
from utils import save_audio

import uuid

app = Flask(__name__)
# Enable CORS globally for the frontend origin and common headers/methods
CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
    methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type"],
)

@app.route('/hello')
def hello():
    return "Hello, World!"

@app.route('/text_to_audio', methods=['POST', 'OPTIONS'])
@cross_origin(origins=["http://localhost:5173", "http://127.0.0.1:5173"], methods=["POST", "OPTIONS"], allow_headers=["Content-Type"])
def text_to_audio():
    if request.method == 'OPTIONS':
        return ("", 204)

    data = request.get_json(silent=True) or {}
    text = data.get('text')
    if not isinstance(text, str) or not text.strip():
        return ({"error": "Campo 'text' ausente ou inválido no corpo JSON."}, 400)

    audio, sample_rate = convert_text_to_audio(text)

    file_id = uuid.uuid4()
    save_audio(audio, sample_rate, file_id)

    return [{"url": f"/audio/{file_id}.wav"}]

@app.route('/audio/<path:audio_file>', methods=['GET', 'OPTIONS'])
@cross_origin(origins=["http://localhost:5173", "http://127.0.0.1:5173"], methods=["GET", "OPTIONS"])
def get_audio(audio_file):
    return send_from_directory('audio', audio_file)