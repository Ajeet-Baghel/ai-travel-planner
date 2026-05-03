# 🌍 AI Travel Planner

An AI-powered full-stack web application that generates personalized travel itineraries based on user preferences such as destination, number of days, budget, and interests.

---

## 🚀 Live Demo

* 🌐 Frontend: https://ajeet-ai-travel-planner.netlify.app
* ⚙️ Backend: https://ai-travel-planner-6mxe.onrender.com

---

## 📦 Project Structure (Monorepo)

This project follows a **monorepo architecture**, where both frontend and backend are managed in a single repository:

```
ai-travel-planner/
├── frontend/   → Next.js application (UI)
├── backend/    → Node.js + Express API
└── README.md
```

---

## ✨ Features

* 🔐 User Authentication (Register / Login)
* 🧭 Create Personalized Trips
* 🤖 AI-based Itinerary Generation
* 💾 Save Trips in Database
* 📋 Dashboard to View All Trips
* 🔎 Detailed Trip View (Itinerary + Hotels)
* ⚡ Fallback System (Mock AI if API fails)

---

## 🧠 AI Integration

The application uses an AI service (Groq API) to generate travel plans.

### 🔁 Fallback Mechanism

If the AI service fails or is unavailable:

* The app switches to a **mock AI response**
* Ensures the application **never breaks**
* Guarantees consistent user experience

👉 This improves reliability and fault tolerance.

---

## 🏗 Tech Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Node.js, Express
* **Database:** MongoDB Atlas
* **AI:** Groq API (with fallback logic)
* **Deployment:** Netlify (Frontend), Render (Backend)

---

## ⚙️ Setup Instructions (Local)

### 🔹 Backend

```bash
cd backend
npm install
node index.js
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Backend (.env)

```
MONGO_URI=xxxxxx...
JWT_SECRET=xxxxx...
GROQ_API_KEY=xxxxx
```

---

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=https://ai-travel-planner-6mxe.onrender.com
```

---

## 🧠 Future Improvements

* ✏️ Editable itinerary (add/remove activities)
* 🔁 Regenerate specific day using AI
* 🗺 Map integration (Google Places / Open alternatives)
* 📊 Budget analytics

---

## 👤 Author

**Ajeet Baghel**
