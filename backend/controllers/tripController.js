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

    const parsedData = aiResponse; 

    const trip = await Trip.create({
      userId: req.user,
      destination,
      days,
      budget,
      interests,
      itinerary: parsedData.itinerary,
      budgetEstimate: parsedData.budget,
      hotels: parsedData.hotels,
      visitingPlaces: parsedData.visitingPlaces,
    });

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error generating trip" });
  }
};
exports.getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error loading trips" });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, userId: req.user });

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    res.json(trip);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error loading trip" });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ _id: req.params.id, userId: req.user });

    if (!trip) {
      return res.status(404).json({ msg: "Trip not found" });
    }

    res.json({ msg: "Trip deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Error deleting trip" });
  }
};
