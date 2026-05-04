
const axios = require("axios");


function mockResponse({ destination, days }) {
  return {
    itinerary: Array.from({ length: Number(days) || 3 }, (_, i) => ({
      day: i + 1,
      activities: [
        `Explore ${destination} highlights`,
        "Local food tour",
        "Evening leisure walk",
      ],
    })),
    budget: {
      flights: "—",
      hotel: "—",
      food: "—",
      activities: "—",
      total: "—",
    },
    hotels: ["Sample Hotel A", "Sample Hotel B"],
  };
}

async function callOpenRouter(prompt) {
  const res = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      
      model: "openai/gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const text = res.data.choices?.[0]?.message?.content || "";
 
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

async function generateTravelPlan(data) {
  const { destination, days, budget, interests } = data;

  const prompt = `
You are a travel planner AI.

Generate a ${days}-day trip for ${destination}.

Budget: ${budget}
Interests: ${interests}

Return ONLY JSON in this format:
{
  "itinerary": [
    { "day": 1, "activities": ["..."] }
  ],
  "budget": {
    "flights": "",
    "hotel": "",
    "food": "",
    "activities": "",
    "total": ""
  },
  "hotels": ["..."]
}
`;

  try {
    return await callOpenRouter(prompt);
  } catch (e) {
    console.error("OpenRouter failed, using mock:", e.message);
    return mockResponse(data);
  }
}

module.exports = generateTravelPlan;