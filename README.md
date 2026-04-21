<div align="center">

# 🧠 Manovritam-AI
### *Mental Health & Wellness Platform*

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=18&pause=1200&color=A78BFA&center=true&vCenter=true&multiline=false&repeat=true&width=550&height=40&lines=AI-Powered+Mental+Health+Support+%F0%9F%A7%A0;Hindi+%2B+English+Bilingual+Platform+%F0%9F%8C%90;Your+Wellness+Companion%2C+Always+%F0%9F%92%9C;Built+with+Node.js+%2B+Gemini+AI+%E2%9A%A1" alt="Typing SVG" />

<br/>

<img src="https://img.shields.io/badge/Version-2.0-blueviolet?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge"/>
<img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge"/>

<br/><br/>

<img src="https://img.shields.io/badge/Made%20with-%F0%9F%92%9C%20for%20Mental%20Health-ff69b4?style=for-the-badge"/>
<img src="https://img.shields.io/badge/Language-Hindi%20%2B%20English-orange?style=for-the-badge"/>
<img src="https://img.shields.io/badge/4th%20Year-Major%20Project-9b59b6?style=for-the-badge"/>

</div>

---

<div align="center">

## 💜 About Manovritam-AI

</div>

> **Manovritam-AI** ek full-featured **Mental Health & Wellness Platform** hai jo **Google Gemini AI** se powered hai. Empathy aur intelligence ke saath design kiya gaya — ye platform emotional support, mood tracking, guided meditation, aur mental wellness sab kuch deta hai — **Hindi & English** dono mein.

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
<img src="screenshots/home.png" width="80%"/>

<br/><br/>

### 📊 Dashboard & Mood Tracker
<img src="screenshots/dashboard.png" width="48%"/> &nbsp; <img src="screenshots/mood.png" width="48%"/>

<br/><br/>

### 💬 AI Chat & Community
<img src="screenshots/chat.png" width="48%"/> &nbsp; <img src="screenshots/community.png" width="48%"/>

<br/><br/>

### 📓 Journal & Crisis Support
<img src="screenshots/journal.png" width="48%"/> &nbsp; <img src="screenshots/crisis.png" width="48%"/>

<br/><br/>

### 💊 Medication Manager
<img src="screenshots/medication.png" width="80%"/>

</div>

---

## 🌐 Features

<div align="center">

```
╔══════════════════════════════════════════════════════════════╗
║              🧠 Manovritam-AI — FEATURE MAP                   ║
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

## ⚡ Quick Setup (4 Steps)

### Step 1 — 🔑 Get Gemini API Key (FREE)

```
1. Go to → https://aistudio.google.com/app/apikey
2. Sign in with Google
3. Click "Create API Key" → Copy it ✅
```

### Step 2 — 📦 Install Dependencies

```bash
cd backend
npm install
```

### Step 3 — ⚙️ Create .env File

```bash
# Windows:
copy .env.example .env
```

Open `.env` and fill in:

```env
GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_CLIENT_ID=123456789-xxxxx.apps.googleusercontent.com
PORT=5000
```

### Step 4 — 🚀 Start Server

```bash
node server.js
```

Open **http://localhost:5000** — you'll see:

```
🧠 Manovritam-AI v2 → http://localhost:5000
🔑 Gemini Key:   ✅ Set
🔑 Google OAuth: ✅ Set
```

---

## 🛠️ Tech Stack

<div align="center">

<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/Google%20OAuth-EA4335?style=for-the-badge&logo=google&logoColor=white"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>

</div>

---

## 🗂️ Project Structure

```
Manovritam-AI/
│
├── 📁 backend/
│   ├── server.js          ← Main entry point
│   ├── .env.example       ← Environment template
│   ├── package.json
│   └── ...
│
├── 📁 screenshots/
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

## 🔑 Google Sign-In Notes

- ✅ Works only when `GOOGLE_CLIENT_ID` is set in `.env`
- ✅ Server exposes the client ID to frontend automatically
- ✅ Without it, email signup/login still works perfectly
- ⚠️ Google signup users **cannot** login with email (and vice versa)

---

## 🤝 Contributing

Contributions are welcome!

- 🐛 Report bugs via Issues
- 💡 Suggest features
- 🔧 Submit pull requests

---

## 📄 License

Licensed under the **MIT License** — free to use, modify, and distribute.

---

<div align="center">

**Made with 💜 by [Ansh Mittal](https://github.com/anshmittal2004)**

*4th Year Major Project — Mental Health & Wellness Platform*

<br/>

⭐ **Star this repo if you found it helpful!** ⭐

<br/>

![Visitor Count](https://visitor-badge.laobi.icu/badge?page_id=anshmittal2004.Manovritam-AI&color=blueviolet)

</div>
