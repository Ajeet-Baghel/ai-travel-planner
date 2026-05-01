const Trip = require("../models/Trip");
const generateTravelPlan = require("../services/aiService");

exports.createTrip = async (req, res) => {
  try {
    const { destination, days, budget, interests } = req.body;

    const aiResponse = await generateTravelPlan({
      destination,
      days,
      budget,
      interests,
    });

    const cleanResponse = aiResponse.replace(/```json|```/g, "").trim();

    const parsedData = JSON.parse(cleanResponse);

    const trip = await Trip.create({
      userId: req.user,
      destination,
      days,
      budget,
      interests,
      itinerary: parsedData.itinerary,
      budgetEstimate: parsedData.budget,
      hotels: parsedData.hotels,
    });

    res.json(trip);
  } catch (error) {
    console.error(error);
    
    res.status(500).json({ msg: "Error generating trip" });
  }
};
