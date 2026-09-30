# Midnight Magic School

A student-friendly comic-story web application for creating a panel-by-panel animated cartoon story.

## Features

- React + Vite frontend
- Express backend
- Panel-by-panel comic layout
- Animated CSS/SVG cartoon characters
- Built-in "Midnight Magic School" story that works without an API key
- Optional OpenAI Responses API integration for generating a new structured story
- Simple health check API
- Responsive UI for desktop and mobile

## 1. Requirements

- Node.js 18+ (Node 20+ recommended)
- VS Code

## 2. Install

From the project root:

```bash
npm install
npm install --workspace client
npm install --workspace server
```

## 3. Configure AI

Create `server/.env`:

```env
PORT=5000
OPENAI_API_KEY=your_api_key_here
OPENAI_MODEL=gpt-5.6-luna
```

The application still works without `OPENAI_API_KEY`; it uses the built-in story.

## 4. Run

```bash
npm run dev
```

Open:

http://localhost:5173

The frontend calls the backend at `http://localhost:5000`.

## 5. Test

Health endpoint:

http://localhost:5000/api/health

Then press **Create Story** in the web page.

If no API key is configured, the application intentionally uses the included Midnight Magic School story so the UI can still be tested end-to-end.

## Project structure

```text
midnight-magic-school/
├── client/
│   ├── index.html
│   ├── package.json
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       ├── styles.css
│       └── components/
│           ├── Character.jsx
│           └── ComicPanel.jsx
├── server/
│   ├── package.json
│   ├── .env.example
│   └── src/
│       ├── server.js
│       ├── data/
│       │   └── midnightStory.js
│       ├── routes/
│       │   ├── health.routes.js
│       │   └── story.routes.js
│       └── services/
│           └── ai.service.js
├── package.json
└── README.md
```
