# Image captioning frontend

The React and Vite interface for the [image caption, translation, and speech demo](../README.md). It runs the image captioning model in the browser, then calls the local Node translation API and Python speech API.

From this directory, install dependencies and start Vite:

```bash
pnpm install
pnpm dev
```

The app expects the APIs at `http://localhost:3000` and `http://localhost:5000`. See the [project README](../README.md) for the complete local setup.
