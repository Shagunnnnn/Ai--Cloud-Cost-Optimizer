const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Route to compare multiple services
app.post("/api/cost/compare", (req, res) => {
  const { services } = req.body;

  if (!services || services.length < 2) {
    return res.status(400).json({ error: "Provide at least 2 services for comparison" });
  }

  const results = services.map((service) => {
    let totalCurrentCost = 0;
    let totalOptimizedCost = 0;

    const currentBreakdown = service.components.map((c) => {
      totalCurrentCost += c.cost;
      return { ...c };
    });

    const optimizedBreakdown = service.components.map((c) => {
      let newCost = c.cost;
      let rule = "No rule applied";
      let reason = "High usage, cannot optimize";

      // Example rule: reduce 25% if usage < 50%
      if (c.usage < 50) {
        newCost = c.cost * 0.75;
        rule = "25% cost reduction for low usage";
        reason = "Usage below 50%, cheaper plan available";
      }

      totalOptimizedCost += newCost;

      return {
        name: c.name,
        oldCost: c.cost,
        newCost: newCost.toFixed(2),
        saving: (c.cost - newCost).toFixed(2),
        rule,
        reason,
        type: c.type,
        usage: c.usage,
      };
    });

    return {
      serviceName: service.serviceName,
      currentBreakdown,
      optimizedBreakdown,
      totalCurrentCost: totalCurrentCost.toFixed(2),
      totalOptimizedCost: totalOptimizedCost.toFixed(2),
      totalSavings: (totalCurrentCost - totalOptimizedCost).toFixed(2),
    };
  });

  // Sort by optimized cost (lowest first)
  results.sort((a, b) => a.totalOptimizedCost - b.totalOptimizedCost);
  const bestService = results[0];

  res.json({ results, bestService });
});

// Health check
app.get("/", (req, res) => res.send("AI Cloud Cost Comparator backend is running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
