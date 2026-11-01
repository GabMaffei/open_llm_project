# Image Caption, Translation, and Speech Demo

A browser-based demo that turns an image URL into an English caption, translates the caption into Brazilian Portuguese, and generates spoken audio. The frontend runs image captioning with a public Hugging Face model; separate Node and Python APIs handle translation and speech synthesis.

This is a course project based on the public-model hosting module in Rocketseat's Tech Developer 360 postgraduate program. It demonstrates a local inference pipeline; it is not a hosted service.

## Flow

1. Enter an image URL in the React app.
2. The browser runs `Xenova/vit-gpt2-image-captioning` through Transformers.js and displays the generated English caption.
3. The app sends the caption to the Node API, which translates English to Brazilian Portuguese with `Xenova/nllb-200-distilled-600M`.
4. The app sends the translation to the Python API, which uses `suno/bark-small` to generate a WAV file and returns its local URL.

## Stack

- **Frontend:** React 19, Vite, JavaScript, and `@huggingface/transformers`.
- **Translation API:** Node.js, Express, and `@huggingface/transformers`.
- **Speech API:** Python 3.13, Flask, Hugging Face Transformers, and the Bark model.
- **Containers:** Dockerfiles and Compose files are included for each API.

Model weights are downloaded the first time each model is loaded. Runtime and memory use depend on the model and machine; GPU acceleration is not configured as a requirement.

## Run locally

Use three terminals. Install dependencies in each component before starting it.

### 1. Frontend

```bash
cd front
pnpm install
pnpm dev
```

Vite normally serves the app at `http://localhost:5173`.

### 2. Translation API

```bash
cd server_node
pnpm install --frozen-lockfile
node index.js
```

The API listens on `http://localhost:3000`. Its `POST /translate` route accepts JSON with a `text` field.

### 3. Speech API

Install [uv](https://docs.astral.sh/uv/) and run:

```bash
cd server_python
uv sync
uv run flask --app main.py run --host 127.0.0.1 --port 5000
```

The API listens on `http://localhost:5000`. Its `POST /text_to_audio` route accepts JSON with a non-empty `text` field and returns a URL for the generated WAV file.

## Docker

Each backend has its own Dockerfile and Compose file. Start one service from its directory with:

```bash
docker compose up --build
```

The Node service maps to port 3000 and the Python service maps to port 5000. Start the frontend separately. The frontend currently calls both APIs at fixed localhost URLs.

## Repository layout

```text
front/         React UI and browser-side image captioning
server_node/   English-to-Portuguese translation API
server_python/ Text-to-speech API and generated local audio files
```

## Current scope and limitations

- The interface accepts an image URL; it does not upload or store images.
- API addresses and allowed frontend origins are configured in source for local development.
- The Python handler constructs the speech model for each request, so repeated requests can reload the model and take time. Generated audio is kept in the local `server_python/audio/` directory.
- The Node package's `test` script intentionally exits with “no test specified,” and no test suite is configured for the other components.
- This repository documents a course exercise and local inference demo. It does not include production deployment, request authentication, or service-level resource controls.

## Learning context

The related course module builds an image-captioning, translation, and speech-synthesis pipeline with JavaScript, React, Node.js, and Python. This repository is an educational implementation of that workflow.
