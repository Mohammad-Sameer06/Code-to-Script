# Code-to-Video Pipeline

A production-ready MERN stack web application for developer educators. It allows users to paste code snippets and utilizes an AI API to generate a structured video script with visual breakpoint suggestions.

## Features

- **Enterprise UI:** Strict, professional, clean design using a high-contrast slate color palette.
- **Code Editor:** Integrated Monaco Editor with syntax highlighting for multiple languages.
- **AI Integration Placeholder:** Backend service ready to connect to an LLM for code analysis and script generation.
- **MongoDB Storage:** Saves your generated scripts and raw code for future reference.

## Prerequisites

- Node.js (v18+ recommended)
- MongoDB running locally on `localhost:27017` or a MongoDB Atlas URI.

## Installation

### 1. Backend Setup

Open a terminal and navigate to the `server` directory:

```bash
cd server
npm install
```

Configure your environment variables in `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/code-to-video
AI_API_KEY=your_placeholder_api_key_here
```

Start the backend server:
```bash
npm start
# or use nodemon if installed globally:
# nodemon server.js
```
The server will run on `http://localhost:5000`.

### 2. Frontend Setup

Open a new terminal and navigate to the `client` directory:

```bash
cd client
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The client will run on `http://localhost:5173` (or similar port assigned by Vite).

## Architecture & Integration

- **Frontend:** Built with React 19, Vite, Tailwind CSS v4, Lucide React, and Monaco Editor. The frontend follows a component-based architecture split into Layout, Editor, Output, and UI elements.
- **Backend:** Express.js server connected to MongoDB via Mongoose. Follows MVC pattern for clear separation.
- **AI Service:** Located in `server/services/aiService.js`. Currently uses a placeholder logic that mocks a 2-second processing delay and returns a structured timeline. You can replace this logic directly with LangChain or official LLM SDKs like OpenAI or Google Gemini.

## Usage

1. Start both the client and server.
2. Open the web app in your browser.
3. On the left panel, input a Project Title, select your programming language, and paste your source code into the Monaco Editor.
4. Click **Generate Script**.
5. Wait for the AI placeholder to process the code. The right panel will display the generated script cards, detailing the spoken text, the exact line numbers to focus on, and suggested visual actions for your video editing.
