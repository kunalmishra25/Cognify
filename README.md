# 🧠 Cognify - AI Study Assistant

Cognify is a full-stack AI-powered study assistant that helps students transform PDF study materials into structured and interactive learning resources.

Users can upload PDFs and generate AI-powered summaries, flashcards, and quizzes using Groq LLMs. The platform also provides authentication, personalized notes, flashcard decks, quiz scoring, and a dashboard for managing study resources.

## ✨ Features

- 📄 **PDF Upload & Processing** — Upload study materials and extract text from PDF files.
- 🤖 **AI Summaries** — Generate structured study notes using Groq LLM APIs.
- 🃏 **AI Flashcards** — Generate flashcard decks from study materials.
- ❓ **AI Quizzes** — Generate multiple-choice quizzes with interactive scoring.
- 📥 **Summary Download** — Download generated summaries as `.txt` files.
- 📚 **My Notes** — View, manage, and access saved study materials.
- 🃏 **Flashcard Decks** — Browse generated decks and study individual decks.
- 📊 **Dashboard** — View document, flashcard, and quiz statistics along with recent activity.
- 👤 **Profile** — View account information and manage logout.
- 🔐 **Authentication & Authorization** — JWT authentication with HTTP-only cookies and protected routes.
- 🛡️ **User Data Isolation** — Users can only access their own summaries, flashcards, and quizzes.

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS
- React Router
- Axios
- React Markdown

### Backend
- Node.js
- Express.js
- Multer
- PDF Parser
- REST APIs

### Database
- MongoDB
- Mongoose

### AI
- Groq API
- LLM-based content generation

### Authentication
- JWT
- HTTP-only Cookies

### Deployment
- Vercel
- Render
- MongoDB Atlas

## 🔄 How It Works

```text
User
  ↓
Upload PDF
  ↓
Extract PDF Text
  ↓
Groq AI Processing
  ↓
┌────────────┬────────────┬────────────┐
│  Summary   │ Flashcards │    Quiz    │
└────────────┴────────────┴────────────┘
       ↓
    MongoDB
       ↓
Dashboard / My Notes
       ↓
Study & Review