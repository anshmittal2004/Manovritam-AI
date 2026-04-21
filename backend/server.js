require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const path     = require("path");
const https    = require("https");

const app  = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.static(path.join(__dirname, "public")));

// ── Groq API call (no SDK needed — plain HTTPS) ───────────────────────────────
function groqChat(messages, systemPrompt) {
  const key = process.env.GROQ_API_KEY;
  if (!key || key === "your_groq_api_key_here")
    return Promise.reject(new Error("GROQ_API_KEY missing in .env — get free key at https://console.groq.com/keys"));

  const body = JSON.stringify({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "system", content: systemPrompt }, ...messages],
    max_tokens: 600,
    temperature: 0.8,
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}`, "Content-Length": Buffer.byteLength(body) }
    }, (res) => {
      let data = "";
      res.on("data", chunk => data += chunk);
      res.on("end", () => {
        try {
          const json = JSON.parse(data);
          if (json.error) return reject(new Error(json.error.message || "Groq API error"));
          resolve(json.choices[0].message.content);
        } catch(e) { reject(new Error("Failed to parse Groq response")); }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ── Google OAuth verifier ─────────────────────────────────────────────────────
async function verifyGoogleToken(token) {
  const { OAuth2Client } = require("google-auth-library");
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId === "your_google_client_id_here.apps.googleusercontent.com")
    throw new Error("GOOGLE_CLIENT_ID not set in .env");
  const ticket = await new OAuth2Client(clientId).verifyIdToken({ idToken: token, audience: clientId });
  return ticket.getPayload();
}

// ── In-memory store ───────────────────────────────────────────────────────────
const users         = {};
const sessions      = {};
const conversations = {};
const moodEntries   = {};
const journalArr    = [];
const medications   = {};
const appointments  = {};
const gratitudeLog  = {};
const breathStats   = {};

function mkSession(email) {
  const sid = `s_${Date.now()}_${Math.random().toString(36).slice(2)}`;
  sessions[sid] = email;
  conversations[sid] = [];
  return sid;
}
function getHistory(sid) {
  if (!conversations[sid]) conversations[sid] = [];
  return conversations[sid];
}

// ── System Prompt (bilingual) ─────────────────────────────────────────────────
function buildPrompt(context, lang) {
  const isHindi = lang === "hi";
  const base = isHindi
    ? `Aap Manovriti hain — ek dost jaisa, samajhdaar AI mental health saathi jo Manovriti AI wellness platform par kaam karta hai.

Aapki personality:
- Garmsoshi, empathetic, bina kisi judgment ke
- India ki sanskriti se parichit
- Calm aur supportive — kabhi clinical ya robotic nahi
- Ek caring dost ki tarah jo psychology bhi samajhta hai

Zimmedariyan:
- Emotional support, coping techniques (breathing, grounding, mindfulness)
- CBT-based thought reframing
- Neend, stress, anxiety, depression ke liye healthy habits suggest karna
- Serious cases mein professional help recommend karna

ZAROORI SAFETY RULES:
- Agar koi self-harm ya suicide ki baat kare → HAMESHA dein: iCall India: 9152987821, Vandrevala Foundation: 1860-2662-345 (24/7)
- Kabhi bhi medical diagnosis ya prescription nahi dena

Style:
- Short aur warm jawab (3-5 sentences)
- Saral Hinglish ya Hindi mein bolein
- Pyaar se follow-up sawaal zaroor poochein`
    : `You are Manovriti — a warm, emotionally intelligent AI mental health companion on the Manovriti AI wellness platform.

Personality:
- Warm, empathetic, non-judgmental
- Culturally aware (India-focused; can use Hindi phrases naturally)
- Calm & supportive — never robotic or clinical
- Like a caring friend who understands psychology

Responsibilities:
- Emotional support, coping techniques (breathing, grounding, mindfulness)
- CBT-based thought reframing
- Healthy habits for sleep, stress, anxiety, depression
- Recommend professional help when serious

CRITICAL SAFETY:
- Self-harm/suicidal intent → ALWAYS provide: iCall India: 9152987821, Vandrevala Foundation: 1860-2662-345 (24/7)
- Never diagnose or prescribe medication

Style:
- Concise (3-5 sentences) unless deep reflection needed
- Natural Hindi phrases when helpful (e.g., "Sab theek ho jaayega")
- End with one gentle follow-up question`;

  const ctxMap = {
    mood:      isHindi ? "\n\nContext: User mood tracker par hai. Unke mood ko validate karein aur ek coping tip dein." : "\n\nContext: User is on Mood Tracker. Validate emotions and offer a coping tip.",
    journal:   isHindi ? "\n\nContext: User journal likh raha hai. Open-ended sawaal poochein." : "\n\nContext: User is journaling. Ask open-ended reflective questions.",
    meditation:isHindi ? "\n\nContext: User meditation/breathing chahta hai. Step-by-step guide karein." : "\n\nContext: User wants meditation. Guide step by step.",
    medication:isHindi ? "\n\nContext: User medications manage kar raha hai. General wellness tips dein, prescribe mat karein." : "\n\nContext: User managing medications. Give wellness tips, never prescribe.",
  };
  return base + (ctxMap[context] || "");
}

// ── ROUTES ────────────────────────────────────────────────────────────────────

app.get("/api/health", (_, res) => {
  const gKey   = process.env.GROQ_API_KEY;
  const gOAuth = process.env.GOOGLE_CLIENT_ID;
  const hasGoogle = !!(gOAuth && gOAuth !== "your_google_client_id_here.apps.googleusercontent.com" && gOAuth.includes('.apps.googleusercontent.com'));
  res.json({
    status: "ok",
    groqKey: !!(gKey && gKey !== "your_groq_api_key_here"),
    googleAuth: hasGoogle,
    googleClientId: hasGoogle ? gOAuth : null,
  });
});

// ── Google OAuth ──────────────────────────────────────────────────────────────
app.post("/api/auth/google", async (req, res) => {
  const { credential } = req.body;
  if (!credential) return res.status(400).json({ error: "Google credential missing." });
  try {
    const { email, name, picture, sub } = await verifyGoogleToken(credential);
    if (!users[email]) {
      users[email] = { name, email, picture, googleId: sub, provider: "google", createdAt: new Date().toISOString() };
      moodEntries[email] = {}; medications[email] = []; appointments[email] = []; gratitudeLog[email] = [];
    }
    const sid = mkSession(email);
    res.json({ success: true, sessionId: sid, user: { name, email, picture, provider: "google" } });
  } catch (err) {
    console.error("Google auth error:", err.message);
    res.status(401).json({ error: "Google sign-in failed. Check GOOGLE_CLIENT_ID in .env" });
  }
});

// ── Email Auth ────────────────────────────────────────────────────────────────
app.post("/api/signup", (req, res) => {
  const { name, email, phone, age, concern, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Name, email and password required." });
  if (users[email]) return res.status(409).json({ error: "Email already registered." });
  users[email] = { name, email, phone, age, concern, password, provider: "email", createdAt: new Date().toISOString() };
  moodEntries[email] = {}; medications[email] = []; appointments[email] = []; gratitudeLog[email] = [];
  res.json({ success: true, sessionId: mkSession(email), user: { name, email, age, concern } });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const u = users[email];
  if (!u) return res.status(401).json({ error: "No account found. Please sign up first." });
  if (u.provider === "google") return res.status(401).json({ error: "This account uses Google Sign-In. Please use the Google button." });
  if (u.password !== password) return res.status(401).json({ error: "Wrong password. Please try again." });
  res.json({ success: true, sessionId: mkSession(email), user: { name: u.name, email, age: u.age, concern: u.concern } });
});

// ── Chatbot (Groq — FREE + FAST) ──────────────────────────────────────────────
app.post("/api/chatbot", async (req, res) => {
  const { message, sessionId, context, lang } = req.body;
  if (!message?.trim()) return res.status(400).json({ error: "Message required." });

  const sid  = sessionId || "guest";
  const hist = getHistory(sid);

  // Build messages array (keep last 16 for context)
  const messages = hist.slice(-16).map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));
  messages.push({ role: "user", content: message.trim() });

  try {
    const reply = await groqChat(messages, buildPrompt(context, lang));

    hist.push({ role: "user",      content: message.trim() });
    hist.push({ role: "assistant", content: reply });
    if (hist.length > 40) hist.splice(0, 2);

    res.json({ reply, sessionId: sid });
  } catch (err) {
    console.error("Groq error:", err.message);
    res.status(500).json({
      error: err.message.includes("GROQ_API_KEY")
        ? "API key missing — add GROQ_API_KEY to .env (free at console.groq.com/keys)"
        : "AI temporarily unavailable. Please try again."
    });
  }
});

// ── Mood ──────────────────────────────────────────────────────────────────────
app.post("/api/mood/save", (req, res) => {
  const { userId, dateStr, mood, emoji, note } = req.body;
  if (!userId || !dateStr || !mood) return res.status(400).json({ error: "Missing fields." });
  if (!moodEntries[userId]) moodEntries[userId] = {};
  moodEntries[userId][dateStr] = { mood, emoji, note, timestamp: new Date().toISOString() };
  res.json({ success: true });
});
app.get("/api/mood/:userId", (req, res) => res.json({ moodData: moodEntries[req.params.userId] || {} }));

app.post("/api/mood/insight", async (req, res) => {
  const { moodData, lang } = req.body;
  if (!moodData || !Object.keys(moodData).length)
    return res.json({ insight: lang === "hi" ? "Apna mood roz track karein aur AI insights paayein! 🌱" : "Track moods daily for AI insights! 🌱" });

  const summary = Object.entries(moodData).sort(([a],[b])=>b.localeCompare(a)).slice(0,14)
    .map(([d,e])=>`${d}: ${e.mood}${e.note?` ("${e.note.slice(0,40)}")`:""}`).join("\n");

  try {
    const langInstr = lang === "hi" ? "Respond in Hindi/Hinglish." : "Respond in English.";
    const insight = await groqChat(
      [{ role: "user", content: `Analyze this mood pattern and give warm 2-3 sentence insight + one actionable tip. Brief and kind. ${langInstr}\n\nMood log:\n${summary}` }],
      "You are a compassionate mental wellness AI. Be warm, encouraging, and brief."
    );
    res.json({ insight });
  } catch { res.json({ insight: lang==="hi" ? "Patterns dikh rahe hain — aise hi track karte rahein! 🌿" : "Keep logging — patterns will emerge! 🌿" }); }
});

// ── Journal ───────────────────────────────────────────────────────────────────
app.post("/api/journal/save", (req, res) => {
  const { userId, data } = req.body;
  const e = { id: Date.now(), userId: userId||"guest", data, date: new Date().toISOString() };
  journalArr.unshift(e);
  if (journalArr.length > 50) journalArr.pop();
  res.json({ success: true, entryId: e.id });
});
app.get("/api/journal/:userId", (req, res) => res.json({ entries: journalArr.filter(e=>e.userId===req.params.userId) }));

// ── Medications ───────────────────────────────────────────────────────────────
app.get("/api/medications/:userId",  (req, res) => res.json({ medications: medications[req.params.userId]||[] }));
app.post("/api/medications/save", (req, res) => {
  const { userId, medication } = req.body;
  if (!userId||!medication) return res.status(400).json({ error: "Missing." });
  if (!medications[userId]) medications[userId] = [];
  medication.id = Date.now();
  medications[userId].push(medication);
  res.json({ success: true, id: medication.id });
});
app.delete("/api/medications/:userId/:id", (req, res) => {
  if (medications[req.params.userId]) medications[req.params.userId] = medications[req.params.userId].filter(m=>m.id!=req.params.id);
  res.json({ success: true });
});

// ── Appointments ──────────────────────────────────────────────────────────────
app.get("/api/appointments/:userId",  (req, res) => res.json({ appointments: appointments[req.params.userId]||[] }));
app.post("/api/appointments/save", (req, res) => {
  const { userId, appointment } = req.body;
  if (!userId||!appointment) return res.status(400).json({ error: "Missing." });
  if (!appointments[userId]) appointments[userId] = [];
  appointment.id = Date.now();
  appointments[userId].push(appointment);
  res.json({ success: true, id: appointment.id });
});
app.delete("/api/appointments/:userId/:id", (req, res) => {
  if (appointments[req.params.userId]) appointments[req.params.userId] = appointments[req.params.userId].filter(a=>a.id!=req.params.id);
  res.json({ success: true });
});

// ── Gratitude ─────────────────────────────────────────────────────────────────
app.get("/api/gratitude/:userId", (req, res) => res.json({ entries: gratitudeLog[req.params.userId]||[] }));
app.post("/api/gratitude/save", (req, res) => {
  const { userId, date, entries } = req.body;
  if (!userId||!date||!entries) return res.status(400).json({ error: "Missing." });
  if (!gratitudeLog[userId]) gratitudeLog[userId] = [];
  const idx = gratitudeLog[userId].findIndex(e=>e.date===date);
  if (idx>=0) gratitudeLog[userId][idx] = { date, entries, savedAt: new Date().toISOString() };
  else gratitudeLog[userId].unshift({ date, entries, savedAt: new Date().toISOString() });
  res.json({ success: true });
});

// ── Breath stats ──────────────────────────────────────────────────────────────
app.post("/api/breath/log", (req, res) => {
  const { userId, cycles } = req.body;
  if (!breathStats[userId]) breathStats[userId] = { total:0, sessions:0 };
  breathStats[userId].total    += cycles||0;
  breathStats[userId].sessions += 1;
  breathStats[userId].last      = new Date().toISOString();
  res.json({ success: true, stats: breathStats[userId] });
});
app.get("/api/breath/stats/:userId", (req, res) => res.json({ stats: breathStats[req.params.userId]||{ total:0, sessions:0 } }));

// ── Fallback ──────────────────────────────────────────────────────────────────
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => {
  const gk = process.env.GROQ_API_KEY;
  const go = process.env.GOOGLE_CLIENT_ID;
  console.log(`\n🧠 Manovriti AI v2 → http://localhost:${PORT}`);
  console.log(`⚡ Groq Key:     ${gk && gk !== "your_groq_api_key_here" ? "✅ Set — Llama 3 ready!" : "❌ Missing! Get free key → https://console.groq.com/keys"}`);
  console.log(`🔑 Google OAuth: ${go && go.includes('.apps.googleusercontent.com') ? "✅ Set" : "⚠️  Optional — email login works without it"}`);
  if (!gk || gk === "your_groq_api_key_here") {
    console.log(`\n👉 Steps to fix:`);
    console.log(`   1. Go to https://console.groq.com/keys`);
    console.log(`   2. Sign in (free) → Create API Key → Copy it`);
    console.log(`   3. Open .env → set GROQ_API_KEY=your_key_here`);
    console.log(`   4. Restart: node server.js\n`);
  }
  console.log(`\n📡 Routes ready: signup | login | auth/google | chatbot | mood | journal | medications | appointments\n`);
});