# CDP Support Agent - Frontend

This is the frontend for the CDP Support Agent Chatbot, a specialized application that answers "how-to" questions about Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap.

## Features

- **Modern Chat Interface**: Clean, responsive React-based chat UI
- **Platform Selection**: Focus queries on a specific CDP or search across all platforms
- **Comparison Mode**: Compare functionality between different CDP platforms
- **Markdown Support**: Renders formatted responses with code syntax highlighting
- **Real-time Interaction**: Immediate feedback and responses from the backend API

## Tech Stack

- **React**: UI library for building the interface
- **Vite**: Next-generation frontend tooling
- **React Markdown**: For rendering markdown responses
- **React Syntax Highlighter**: For syntax highlighting in code examples

## Directory Structure

```
frontend/
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ComparisonSelector.jsx
│   │   ├── LoadingIndicator.jsx
│   │   ├── Message.jsx
│   │   └── PlatformSelector.jsx
│   ├── index.css
│   └── main.jsx
└── vite.config.js
```

## Installation and Setup

1. Make sure you have Node.js installed (version 16 or higher recommended)

2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The frontend will be available at http://localhost:5173 (or another port if 5173 is in use)

## Usage

1. Select a CDP platform from the dropdown menu or choose "All Platforms" to search across all documentation
2. Type your "how-to" question in the input field and press Enter or click Send
3. Toggle the comparison mode to compare functionality between two platforms
4. View the response in the chat area with proper formatting and syntax highlighting

## Building for Production

To build the frontend for production deployment:

```bash
npm run build
```

This will generate optimized assets in the `dist` directory.

## Development

- Run the development server with hot module replacement:
  ```bash
  npm run dev
  ```

- Lint your code:
  ```bash
  npm run lint
  ```

## Example Questions

- "How do I set up a new source in Segment?"
- "How can I create a user profile in mParticle?"
- "How do I build an audience segment in Lytics?"
- "How can I integrate my data with Zeotap?"
- "How does Segment's audience creation process compare to Lytics'?"

## Notes

- The frontend requires the backend API to be running
- The UI is designed to be responsive and works on both desktop and mobile devices