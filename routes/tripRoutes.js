const express = require("express");
const router = express.Router();
const tripController = require("../controllers/tripController");

// Get all trips
router.get("/trips", tripController.getAllTrips);
// Thêm trip mới
router.post("/trips", tripController.addTrip);
// Cập nhật trip theo ID
router.put("/trips/:id", tripController.updateTrip);
// Xóa trip theo ID
router.delete("/trips/:id", tripController.deleteTrip);

module.exports = router;