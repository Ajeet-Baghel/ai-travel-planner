 require("dotenv").config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function generateTravelPlan(data) {
//   const { destination, days, budget, interests } = data;

//   const model = genAI.getGenerativeModel({model :"models/gemini-1.0-pro"});

//   const prompt = `
// You are a travel planner AI.

// Generate a ${days}-day trip for ${destination}.

// Budget: ${budget}
// Interests: ${interests}

// Return ONLY JSON in this format:
// {
//   "itinerary": [
//     { "day": 1, "activities": ["..."] }
//   ],
//   "budget": {
//     "flights": "",
//     "hotel": "",
//     "food": "",
//     "activities": "",
//     "total": ""
//   },
//   "hotels": ["..."]
// }
// `;

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//   const text = response.text();

//   console.log("API KEY:", process.env.GEMINI_API_KEY);

//   return text;
// }


// module.exports = generateTravelPlan;


require("dotenv").config();
const Groq = require("groq-sdk");

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

async function generateTravelPlan(data) {
  const { destination, days, budget, interests } = data;

  try {
    const prompt = `
You are a travel planner AI.

Create a ${days}-day travel itinerary for ${destination}.

Budget: ${budget}
Interests: ${interests}

Return ONLY valid JSON (no explanation, no extra text) in this format:
{
  "itinerary": [
    { "day": 1, "activities": ["..."] }
  ],
  "hotels": ["..."]
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const text = completion.choices[0].message.content;

    console.log("RAW AI RESPONSE:", text); // Debug

    // Clean markdown formatting if present
    const clean = text.replace(/```json|```/g, "").trim();

    // Parse JSON
    const parsed = JSON.parse(clean);

    return parsed; // ✅ MUST return object

  } catch (error) {
    console.log("Groq failed, using fallback:", error.message);

    // Fallback mock (always works)
    const itinerary = [];

    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        activities: [
          `Explore popular places in ${destination}`,
          `Enjoy ${interests} activities`,
          `Experience local food within ${budget} budget`
        ]
      });
    }

    return {
      itinerary,
      hotels: [
        `${destination} Budget Inn`,
        `${destination} Comfort Hotel`,
        `${destination} Luxury Stay`
      ]
    };
  }
}

module.exports = generateTravelPlan;