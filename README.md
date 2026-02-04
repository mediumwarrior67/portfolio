# Cyberpunk Portfolio

A React Flow-based portfolio website with Discord OAuth integration and AI chatbot capabilities.

## Features

- **Interactive Node-Based UI**: Built with React Flow for a unique, cyberpunk-themed navigation experience
- **Discord OAuth Login**: Login with Discord to unlock premium features
- **AI Chatbot**: Powered by Groq API (Llama 3.3 70B) - visible but locked until login
- **Cyberpunk Aesthetics**: Purple and cyan gradients, neon glows, and smooth animations

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your API key:
   ```
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## GitHub Pages Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions. To set it up:

1. Go to your repository **Settings** → **Secrets and variables** → **Actions**
2. Add a new repository secret:
   - Name: `GROQ_API_KEY`
   - Value: Your Groq API key
3. Push to the main branch to trigger deployment

The site will be available at `https://your-username.github.io/portfolio/`

## Discord OAuth Setup

Configure Discord redirect URIs for both local development and production:
- `http://localhost:5173/portfolio/`
- `https://your-username.github.io/portfolio/`
