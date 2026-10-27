# Personal Portfolio Website

A responsive personal portfolio with five showcased projects, project search/filter,
light/dark mode, and an AI chatbot that answers questions about my portfolio.

**Live website:** https://PLACEHOLDER-your-portfolio.vercel.app

## Technologies
HTML, CSS, JavaScript, Node.js (Vercel serverless function), Google Gemini API, Git, GitHub, Vercel, Cursor AI

## Features
- Sections: Home, About Me, Skills, Projects, Contact Information, AI Chatbot
- Five project cards (title, description, technologies, GitHub link, live link where available)
- Project search by name or technology, plus technology filter chips
- Light/Dark mode toggle (remembers your choice)
- Responsive layout with mobile menu
- AI chatbot grounded in the portfolio data, with a clear error message if the API fails
- API key kept secret on the server (never in GitHub)

## Project structure
```
index.html          page structure
style.css           styling (blue, white, gold theme + dark mode)
script.js           page rendering, search/filter, theme toggle, chatbot UI
portfolio-data.js   ALL personal details + projects (edit this file only)
api/chat.js         serverless chatbot endpoint (calls the Gemini API)
assets/profile.svg  placeholder photo - replace with your own
```

## Setup instructions
1. Open `portfolio-data.js` and replace every `PLACEHOLDER` with your real details.
2. Put your photo in `assets/` (e.g. `profile.jpg`) and update the `photo` line in `portfolio-data.js`.
3. Get a free Gemini API key at https://aistudio.google.com/apikey
4. Test locally (optional): `npm i -g vercel`, then run `vercel dev` in this folder.

## Deploy on Vercel
1. Push this folder to a new GitHub repository.
2. In Vercel: **Add New -> Project**, import the repository, click **Deploy**.
3. Go to **Settings -> Environment Variables**, add `GEMINI_API_KEY` with your key (all environments).
4. **Redeploy** so the key takes effect.
5. Test the live site: project links, search, dark mode, mobile layout and the chatbot.

## Security
The API key is read only from `process.env.GEMINI_API_KEY` inside `api/chat.js`.
It is never written in any source file; `.env` is listed in `.gitignore`.
