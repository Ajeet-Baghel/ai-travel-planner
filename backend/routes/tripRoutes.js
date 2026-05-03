const express = require("express");
const router = express.Router();
const { createTrip } = require("../controllers/tripController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createTrip);
// router.get("/my", authMiddleware, getMyTrips);

module.exports = router;