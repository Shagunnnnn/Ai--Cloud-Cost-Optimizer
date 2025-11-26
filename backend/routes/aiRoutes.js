const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const Cost = require("../models/costModel");

// POST: /api/ai/optimize
router.post("/optimize", async (req, res) => {
  try {
    const { service_name, cost } = req.body;

    if (!service_name || !cost) {
      return res.status(400).json({ error: "Missing inputs" });
    }

    // 🔥 Send cost to Python AI Model
    const response = await fetch("http://127.0.0.1:7000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cost }),
    });

    const aiResult = await response.json();

    if (aiResult.error) {
      return res.status(500).json({ error: "AI model error" });
    }

    // Save into MongoDB
    const saved = await Cost.create({
      service_name,
      cost,
      optimized_cost: aiResult.optimized_cost,
      savings: aiResult.savings,
    });

    // Send back combined result
    res.json({
      message: "AI Optimization successful",
      result: saved,
    });
  } catch (error) {
    console.error("Optimize Error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
