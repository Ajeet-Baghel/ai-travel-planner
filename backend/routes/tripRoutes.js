// const express = require("express");
// const router = express.Router();
// const { createTrip } = require("../controllers/tripController");
// const authMiddleware = require("../middleware/authMiddleware");

// router.post("/create", authMiddleware, createTrip);
// router.get("/my", authMiddleware, getMyTrips);

// module.exports = router;

const {
  createTrip,
  getMyTrips,
  getTripById,
  addActivity,
  removeActivity,
  regenerateDay,
} = require("../controllers/tripController");

router.post("/create", authMiddleware, createTrip);
router.get("/my", authMiddleware, getMyTrips);
router.get("/:id", authMiddleware, getTripById);

// ✨ NEW
router.put("/:id/add-activity", authMiddleware, addActivity);
router.put("/:id/remove-activity", authMiddleware, removeActivity);
router.post("/:id/regenerate-day", authMiddleware, regenerateDay);