const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  destination: String,
  days: Number,
  budget: String,
  interests: String,

  itinerary: [
    {
      day: Number,
      activities: [String],
    },
  ],

  budgetEstimate: {
    flights: String,
    hotel: String,
    food: String,
    activities: String,
    total: String,
  },

  hotels: [String],
}, { timestamps: true });

module.exports = mongoose.model("Trip", tripSchema);