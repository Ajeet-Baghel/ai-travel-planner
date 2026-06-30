const axios = require("axios");

function mockResponse({ destination, days, budget, interests }) {
  const budgetText = budget || "Moderate";
  const interestText = interests || "local culture, food, and sightseeing";

  return {
    itinerary: Array.from({ length: Number(days) || 3 }, (_, i) => ({
      day: i + 1,
      activities: [
        `Morning: explore a popular ${destination} landmark with a ${budgetText.toLowerCase()} budget plan`,
        `Afternoon: enjoy ${interestText} around ${destination}`,
        "Evening: visit a lively local area for food and a relaxed walk",
      ],
    })),
    budget: {
      flights: "Depends on departure city and travel dates",
      hotel: `${budgetText} stay estimate`,
      food: `${budgetText} daily meal estimate`,
      activities: `${budgetText} sightseeing estimate`,
      total: "Final cost depends on season and booking choices",
    },
    hotels: [
      `${budgetText} hotel near ${destination} city center`,
      `${budgetText} stay close to major attractions`,
      `${budgetText} guest-friendly accommodation option`,
    ],
    visitingPlaces: [
      `${destination} old town or main market`,
      `${destination} top viewpoint`,
      `${destination} cultural landmark`,
      `${destination} local food street`,
    ],
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

Return ONLY JSON in this exact format:
{
  "itinerary": [
    { "day": 1, "activities": ["Morning activity", "Afternoon activity", "Evening activity"] }
  ],
  "budget": {
    "flights": "",
    "hotel": "",
    "food": "",
    "activities": "",
    "total": ""
  },
  "hotels": ["Budget-matching hotel suggestion 1", "Budget-matching hotel suggestion 2", "Budget-matching hotel suggestion 3"],
  "visitingPlaces": ["Place to visit 1", "Place to visit 2", "Place to visit 3", "Place to visit 4"]
}

Make every itinerary activity, hotel suggestion, and visiting place specific to ${destination}, suitable for a ${budget} budget, and relevant to these interests: ${interests}.
`;

  try {
    return await callOpenRouter(prompt);
  } catch (e) {
    console.error("OpenRouter failed, using mock:", e.message);
    return mockResponse(data);
  }
}

module.exports = generateTravelPlan;
