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

async function generateTravelPlan(data) {
  const { destination, days, budget, interests } = data;

  try {
    // 🔥 Try real AI first (you can plug Gemini/OpenAI later)
    
    throw new Error("AI not configured"); // temporary

  } catch (error) {
    console.log("Using mock AI fallback");

    // ✅ fallback mock (always works)
    const itinerary = [];

    for (let i = 1; i <= days; i++) {
      itinerary.push({
        day: i,
        activities: [
          `Explore ${destination}`,
          `Enjoy ${interests}`,
          `Stay within ${budget} budget`
        ]
      });
    }   


  return JSON.stringify({
    itinerary: [
      {
        day: 1,
        activities: [
          `Explore ${destination} main attractions`,
          `Try local ${interests} experiences`
        ]
      },
      {
        day: 2,
        activities: [
          `Visit famous spots in ${destination}`,
          `Enjoy ${budget} level dining`
        ]
      }
    ],
    budget: {
      flights: "$300",
      hotel: "$200",
      food: "$150",
      activities: "$100",
      total: "$750"
    },
    hotels: [
      `${destination} Budget Inn`,
      `${destination} Comfort Hotel`,
      `${destination} Luxury Palace`
    ]
  });
}

module.exports = generateTravelPlan;
}