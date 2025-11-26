import React from "react";

export default function OptimizationResult({ data }) {
  return (
    <div className="card">
      <h2>Optimization Breakdown</h2>

      <h3>Current Cost Components</h3>
      {data.currentBreakdown.map((c, i) => (
        <p key={i}><b>{c.name}</b> — {c.cost} ₹ (usage {c.usage ?? "N/A"}%)</p>
      ))}

      <h3>Optimized Components</h3>
      {data.optimizedBreakdown.map((c, i) => (
        <p key={i}>
          <b>{c.name}</b> — <span style={{color:"green"}}>{c.optimizedCost} ₹</span> → saved {c.saving} ₹
          <br/><small style={{color:"#555"}}>Reason: {c.reason}</small>
        </p>
      ))}

      <h3>Total Savings</h3>
      <p><b>{data.totalSavings} ₹ saved</b></p>

      <h3>Final Optimized Cost</h3>
      <p><b>{data.finalOptimizedCost} ₹</b></p>
    </div>
  );
}
