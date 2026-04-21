<div align="center">

# 🧠 Manovriti AI v2

### *Mental Health & Wellness Platform*

> 🤖 AI-Powered Mental Health Support &nbsp;|&nbsp; 🌐 Hindi + English &nbsp;|&nbsp; 💜 Your Wellness Companion

<br/>

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.0-blueviolet?style=for-the-badge&logo=git&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google-Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20for%20Mental%20Health-ff69b4?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Language-Hindi%20%2B%20English-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/4th%20Year-Major%20Project-9b59b6?style=for-the-badge"/>
</p>

</div>

---

<div align="center">

## 💜 About Manovriti AI

</div>

> **Manovriti AI** is a full-featured **Mental Health & Wellness Platform** powered by **Google Gemini AI**. Designed with empathy and intelligence, it provides users with an AI companion for emotional support, mood tracking, guided meditation, and mental wellness — all in **Hindi & English**.

<br/>

---

## ✨ What's New in v2

<div align="center">

| 🆕 Feature | 📝 Description |
|:---:|:---|
| 🔐 **Google Sign-In** | One-click login with Google account |
| 🌐 **Bilingual Support** | Full Hindi + English toggle (EN/हिं) everywhere |
| 🤖 **Bigger Chatbot** | Enhanced 440×640px AI chatbot with language bar |
| 🕐 **Timestamps** | Every message now shows time |
| 📓 **Gratitude Journal** | New journaling routes added |
| 🌬️ **Breath Stats** | Breathing exercise statistics |

</div>

---

## 🖥️ Screenshots

<div align="center">

### 🏠 Home Page
<img src="screenshots/home.png" width="80%" style="border-radius: 12px; box-shadow: 0 8px 32px rgba(167,139,250,0.3)"/>

<br/><br/>

### 📊 Dashboard & Mood Tracker
<p>
  <img src="screenshots/dashboard.png" width="48%" style="border-radius: 12px"/>
  &nbsp;
  <img src="screenshots/mood.png" width="48%" style="border-radius: 12px"/>
</p>

<br/>

### 💬 AI Chat & Community
<p>
  <img src="screenshots/chat.png" width="48%" style="border-radius: 12px"/>
  &nbsp;
  <img src="screenshots/community.png" width="48%" style="border-radius: 12px"/>
</p>

<br/>

### 📓 Journal & Crisis Support
<p>
  <img src="screenshots/journal.png" width="48%" style="border-radius: 12px"/>
  &nbsp;
  <img src="screenshots/crisis.png" width="48%" style="border-radius: 12px"/>
</p>

<br/>

### 💊 Medication Manager
<img src="screenshots/medication.png" width="80%" style="border-radius: 12px"/>

</div>

---

## 🌐 Features

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║              🧠 MANOVRITI AI — FEATURE MAP                   ║
╠══════════════════════════════════════════════════════════════╣
║  🤖 AI Chatbot (EN+Hindi)    →  All Pages                    ║
║  📊 Mood Tracker + Insights  →  mood-tracker.html            ║
║  💊 Medication Manager       →  medication-manager.html      ║
║  🧘 Guided Meditation        →  meditation.html              ║
║  👨‍⚕️ Doctor Connectivity      →  doctor.html                  ║
║  📓 Digital Canvas Journal   →  journal.html                 ║
║  🆘 Crisis Support           →  crisis.html                  ║
║  👥 Community Forum          →  community.html               ║
╚══════════════════════════════════════════════════════════════╝
```

</div>

---

## ⚡ Quick Setup (5 Steps)

### Step 1 — 🔑 Get Gemini API Key (FREE)

```bash
1. Go to → https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key" → Copy it ✅
```

### Step 2 — 🔐 Get Google OAuth Client ID

```bash
1. Go to → https://console.cloud.google.com
2. Create a project (or select existing)
3. APIs & Services → Credentials
4. "+ CREATE CREDENTIALS" → OAuth 2.0 Client ID
5. Application type: Web application
6. Authorized JavaScript origins: http://localhost:5000
7. Click Create → Copy the Client ID ✅
```

> 💡 **Google Sign-In is OPTIONAL** — Email signup works without it!

### Step 3 — 📦 Install Dependencies

```bash
cd backend
npm install
```

### Step 4 — ⚙️ Create .env File

```bash
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

Open `.env` and fill in:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
PORT=5000
```

### Step 5 — 🚀 Start Server

```bash
node server.js
```

Open **http://localhost:5000** — you'll see:

```
🧠 Manovriti AI v2 → http://localhost:5000
🔑 Gemini Key:   ✅ Set
🔑 Google OAuth: ✅ Set
```

---

## 🛠️ Tech Stack

<div align="center">

<p>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/Google%20OAuth-EA4335?style=for-the-badge&logo=google&logoColor=white"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
</p>

</div>

---

## 🔑 Google Sign-In Notes

- ✅ Works only when `GOOGLE_CLIENT_ID` is set in `.env`
- ✅ The server exposes the client ID to the frontend automatically
- ✅ Without it, email signup/login still works perfectly
- ⚠️ Users who sign up with Google **cannot** login with email (and vice versa)

---

## 🗂️ Project Structure

```
Manovritam-AI/
│
├── 📁 backend/
│   ├── server.js          # Main entry point
│   ├── .env.example       # Environment variables template
│   ├── package.json
│   └── ...
│
├── 📁 screenshots/        # App screenshots
│   ├── home.png
│   ├── dashboard.png
│   ├── chat.png
│   ├── mood.png
│   ├── journal.png
│   ├── crisis.png
│   ├── community.png
│   └── medication.png
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Submit pull requests

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

---

**Made with 💜 by [Ansh Mittal](https://github.com/anshmittal2004)**

*4th Year Major Project — Mental Health & Wellness Platform*

<br/>

⭐ **Star this repo if you found it helpful!** ⭐

<br/>

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=anshmittal2004.Manovritam-AI)

</div>
