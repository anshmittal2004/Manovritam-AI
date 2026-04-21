# 🧠 Manovriti AI v2 — Setup Guide
### Mental Health & Wellness Platform | 4th Year Major Project

---

## ✨ What's New in v2
- ✅ **Google Sign-In** — one-click login with Google account
- ✅ **Bilingual** — full Hindi + English toggle (EN/हिं) everywhere
- ✅ **Bigger chatbot** — 440×640px, language bar inside chat
- ✅ **Timestamps** on every message
- ✅ **Gratitude Journal & Breath Stats** routes added

---

## ⚡ Quick Setup (5 Steps)

### Step 1 — Get Gemini API Key (FREE)
1. Go to → **https://aistudio.google.com/app/apikey**
2. Sign in with Google → Click "Create API Key" → Copy it

### Step 2 — Get Google OAuth Client ID (for Sign in with Google)
1. Go to → **https://console.cloud.google.com**
2. Create a project (or select existing)
3. Go to **APIs & Services → Credentials**
4. Click **"+ CREATE CREDENTIALS" → OAuth 2.0 Client ID**
5. Application type: **Web application**
6. Under "Authorized JavaScript origins" add: `http://localhost:5000`
7. Click **Create** → Copy the **Client ID** (ends with `.apps.googleusercontent.com`)

> 💡 Google Sign-In is OPTIONAL. Email signup works without it!

### Step 3 — Install Dependencies
```bash
cd manovriti-backend
npm install
```

### Step 4 — Create .env File
```bash
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

Open `.env` and fill in:
```
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
PORT=5000
```

### Step 5 — Start Server
```bash
node server.js
```

Open **http://localhost:5000** → You'll see:
```
🧠 Manovriti AI v2 → http://localhost:5000
🔑 Gemini Key:   ✅ Set
🔑 Google OAuth: ✅ Set
```

---

## 🌐 Features

| Feature | Page |
|---------|------|
| 🤖 AI Chatbot (EN+Hindi) | All pages |
| 📊 Mood Tracker + AI Insights | mood-tracker.html |
| 💊 Medication Manager | medication-manager.html |
| 🧘 Guided Meditation + Breathing | meditation.html |
| 👨‍⚕️ Doctor Connectivity + Booking | doctor.html |
| 📓 Digital Canvas Journal | journal.html |

---

## 🔑 Google Sign-In Notes

- Works only when `GOOGLE_CLIENT_ID` is set in `.env`
- The server exposes the client ID to the frontend automatically
- Without it, email signup/login still works perfectly
- Users who sign up with Google cannot login with email (and vice versa)

---

*Built with Node.js + Express + Google Gemini API + Google OAuth 2.0*