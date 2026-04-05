from flask import Flask, request, send_from_directory

from models.api import convert_text_to_audio
from utils import save_audio

import uuid

app = Flask(__name__)

@app.route('/hello')
def hello():
    return "Hello, World!"

@app.route('/text_to_audio', methods=['POST'])
def text_to_audio():
    text = request.json['text']

    audio, sample_rate = convert_text_to_audio(text)

    file_id = uuid.uuid4()
    save_audio(audio, sample_rate, file_id)

    return f"audio/{file_id}.wav"

@app.route('/audio/<path:audio_file>', methods=['GET'])
def get_audio(audio_file):
    return send_from_directory('audio', audio_file)