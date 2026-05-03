# 🌍 AI Travel Planner

A full-stack web app that generates personalized travel itineraries using AI.
Users can log in, create trips based on preferences, and view saved trips.

## 🚀 Live Demo

Frontend: https://ajeet-ai-travel-planner.netlify.app/
Backend: https://ai-travel-planner-6mxe.onrender.com

## ✨ Features

* 🔐 Authentication (Login/Register)
* 🧭 Create Trip (destination, days, budget, interests)
* 🤖 AI-generated itinerary (via Groq API)
* 💾 Save trips to database (MongoDB)
* 📋 Dashboard to view trips
* 🔎 Trip details page (day-wise plan + hotels)

## 🏗 Tech Stack

* Frontend: Next.js + Tailwind CSS
* Backend: Node.js + Express
* Database: MongoDB Atlas
* AI: Groq API
* Deployment: Netlify (frontend), Render (backend)

## ⚙️ Setup (Local)

### Backend

```bash
cd backend
npm install
node index.js
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Backend:

```
MONGO_URI=xxxxxx
JWT_SECRET=xxxxxx
GROQ_API_KEY=xxxxxx
```

Frontend:

```
NEXT_PUBLIC_API_URL=https://ai-travel-planner-6mxe.onrender.com
```

## 🧠 Future Improvements

* Editable itinerary (add/remove activities)
* Regenerate specific day with AI
* Map integration
* Budget visualization

## 👤 Author

Ajeet Baghel
