// Vercel serverless function: POST /api/chat
// The secret API key lives ONLY in a Vercel environment variable (GEMINI_API_KEY),
// never in the website files or on GitHub.

const PORTFOLIO = require("../portfolio-data.js");

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function buildSystemPrompt() {
  const projects = PORTFOLIO.projects
    .map(function (p, i) {
      return (
        (i + 1) + ". " + p.title + "\n" +
        "   Description: " + p.description + "\n" +
        "   Details: " + p.details + "\n" +
        "   Technologies: " + p.technologies.join(", ") + "\n" +
        "   GitHub: " + p.github + (p.live ? "\n   Live app: " + p.live : "")
      );
    })
    .join("\n");

  const skills = Object.keys(PORTFOLIO.skills)
    .map(function (k) { return k + ": " + PORTFOLIO.skills[k].join(", "); })
    .join("\n");

  const edu = PORTFOLIO.education
    .map(function (e) { return e.title + " at " + e.place + " (" + e.years + ")"; })
    .join("; ");

  return [
    "You are the friendly AI assistant on " + PORTFOLIO.name + "'s personal portfolio website.",
    "Answer visitors' questions in the first person plural 'I' as if you speak on behalf of the portfolio owner, or in third person if clearer.",
    "Use ONLY the portfolio information below. If the answer is not in it, say you don't have that information and suggest contacting via the details given. Never invent facts, links or experience.",
    "Keep answers short, clear and polite (2-5 sentences unless asked to explain more).",
    "",
    "NAME: " + PORTFOLIO.name,
    "TAGLINE: " + PORTFOLIO.tagline,
    "INTRO: " + PORTFOLIO.intro,
    "ABOUT: " + PORTFOLIO.about,
    "EDUCATION: " + edu,
    "SKILLS:\n" + skills,
    "CONTACT: Email " + PORTFOLIO.contact.email + "; GitHub " + PORTFOLIO.contact.github +
      "; LinkedIn " + PORTFOLIO.contact.linkedin + "; Location " + PORTFOLIO.contact.location,
    "PROJECTS:\n" + projects,
  ].join("\n");
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Chatbot is not configured (missing API key on the server)." });
  }

  const body = typeof req.body === "string" ? safeParse(req.body) : req.body || {};
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Please type a question." });
  if (message.length > 500) return res.status(400).json({ error: "Question is too long (max 500 characters)." });

  const history = Array.isArray(body.history) ? body.history.slice(-6) : [];
  const contents = history
    .filter(function (h) { return h && typeof h.text === "string" && (h.role === "user" || h.role === "bot"); })
    .map(function (h) {
      return { role: h.role === "user" ? "user" : "model", parts: [{ text: h.text.slice(0, 1000) }] };
    });
  contents.push({ role: "user", parts: [{ text: message }] });

  try {
    const apiRes = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/" + MODEL + ":generateContent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: buildSystemPrompt() }] },
          contents: contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 500 },
        }),
      }
    );

    const data = await apiRes.json();
    if (!apiRes.ok) {
      console.error("Gemini API error:", apiRes.status, JSON.stringify(data));
      return res.status(502).json({ error: "The AI service returned an error (status " + apiRes.status + ")." });
    }

    const parts = data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts;
    const reply = parts ? parts.map(function (p) { return p.text || ""; }).join("").trim() : "";
    if (!reply) return res.status(502).json({ error: "The AI service sent an empty answer. Please rephrase your question." });

    return res.status(200).json({ reply: reply });
  } catch (err) {
    console.error("Chat function failed:", err);
    return res.status(500).json({ error: "Could not reach the AI service." });
  }
};

function safeParse(s) {
  try { return JSON.parse(s); } catch (e) { return {}; }
}
