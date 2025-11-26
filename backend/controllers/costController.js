// Example controller function
exports.optimize = (req, res) => {
  const { services } = req.body; // matches frontend: { services: [ {name,cost,usage} ] }

  if (!services || !Array.isArray(services)) {
    return res.status(400).json({ error: "services required" });
  }

  // build current breakdown
  const currentBreakdown = services.map(s => ({
    name: s.name,
    cost: Number(s.cost),
    usage: s.usage ? Number(s.usage) : null
  }));

  // optimization rules (example, tweak percentages as you want)
  const optimizedBreakdown = currentBreakdown.map(c => {
    let percent = 0.25; // default 25% saving
    let reason = "General optimization applied";

    if (c.cost > 15000) { // example for large enterprise numbers in ₹
      percent = 0.40;
      reason = "High cost — recommend reserved instances / committed use";
    } else if (c.cost > 5000) {
      percent = 0.30;
      reason = "Medium cost — right-size and use cheaper tiers";
    } else if (c.cost > 1000) {
      percent = 0.20;
      reason = "Reduce with autoscaling / cheaper storage tier";
    } else {
      percent = 0.10;
      reason = "Small component — minor cleanup & autoscaling";
    }

    const optimizedCost = Number((c.cost * (1 - percent)).toFixed(2));
    const saving = Number((c.cost - optimizedCost).toFixed(2));

    return {
      name: c.name,
      optimizedCost,
      saving,
      reason
    };
  });

  const totalCurrent = currentBreakdown.reduce((s, c) => s + c.cost, 0);
  const totalOptimized = optimizedBreakdown.reduce((s, c) => s + c.optimizedCost, 0);
  const totalSavings = Number((totalCurrent - totalOptimized).toFixed(2));

  // Response object expected by frontend
  res.json({
    currentBreakdown,
    optimizedBreakdown,
    totalSavings,
    finalOptimizedCost: Number(totalOptimized.toFixed(2))
  });
};
