const express = require("express");
const router = express.Router();
const CostModel = require("../models/CostModel");

// GET full optimization history
router.get("/", async (req, res) => {
  try {
    const history = await CostModel.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: "Error fetching history", error });
  }
});

module.exports = router;
