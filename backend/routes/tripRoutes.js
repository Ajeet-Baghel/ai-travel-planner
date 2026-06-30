const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createTrip,
  getMyTrips,
  getTripById,
  deleteTrip,
} = require("../controllers/tripController");

const router = express.Router();

router.post("/create", authMiddleware, createTrip);
router.get("/my", authMiddleware, getMyTrips);
router.get("/:id", authMiddleware, getTripById);
router.delete("/:id", authMiddleware, deleteTrip);

module.exports = router;
