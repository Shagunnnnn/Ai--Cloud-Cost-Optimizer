import React, { useState } from "react";

export default function App() {
  const [services, setServices] = useState([
    { serviceName: "", componentDetails: "" },
    { serviceName: "", componentDetails: "" },
  ]);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleChangeService = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setServices(updated);
  };

  const handleCompare = async () => {
    // Convert textarea lines into components array
    const formattedServices = services.map((s) => {
      const components = s.componentDetails.split("\n").map((line) => {
        const [name, cost, usage, type] = line.split(":").map((v) => v.trim());
        return {
          name,
          cost: Number(cost),
          usage: Number(usage),
          type: type || "compute",
        };
      });
      return { serviceName: s.serviceName, components };
    });

    try {
      const res = await fetch("http://localhost:5000/api/cost/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ services: formattedServices }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setError(errData.error || "Something went wrong");
        setResult(null);
        return;
      }

      const data = await res.json();
      setResult(data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Server not reachable");
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "30px", background: "#000", minHeight: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center" }}>AI Cloud Cost Optimizer</h1>

      {services.map((s, index) => (
        <div key={index} style={{ marginTop: "20px" }}>
          <h2>Service {index + 1}</h2>
          <input
            type="text"
            placeholder="Service Name"
            value={s.serviceName}
            onChange={(e) => handleChangeService(index, "serviceName", e.target.value)}
            style={{ width: "100%", padding: "10px", marginTop: "5px", borderRadius: "5px", fontSize: "16px", color: "black" }}
          />
          <textarea
            value={s.componentDetails}
            onChange={(e) => handleChangeService(index, "componentDetails", e.target.value)}
            placeholder={`Component format: Name: Cost: Usage%: Type\nExample:\nEC2: 18000: 25: compute\nS3-Bucket: 4500: 40: storage`}
            style={{ width: "100%", height: "150px", marginTop: "10px", padding: "10px", borderRadius: "5px", fontSize: "16px", color: "black" }}
          ></textarea>
        </div>
      ))}

      <button
        onClick={handleCompare}
        style={{ marginTop: "20px", padding: "12px", width: "100%", background: "cyan", color: "black", fontWeight: "bold", fontSize: "18px", borderRadius: "5px" }}
      >
        Compare Services
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "30px", padding: "20px", background: "#111", borderRadius: "10px" }}>
          <h2 style={{ color: "lightgreen" }}>Best Service: {result.bestService.serviceName}</h2>

          {result.results.map((s, i) => (
            <div key={i} style={{ marginTop: "20px", borderTop: "1px solid gray", paddingTop: "15px" }}>
              <h3 style={{ color: "cyan" }}>{s.serviceName}</h3>
              <p>Total Current Cost: ${s.totalCurrentCost}</p>
              <p>Total Optimized Cost: ${s.totalOptimizedCost}</p>
              <p>Total Savings: ${s.totalSavings}</p>

              <h4>📌 Component Breakdown</h4>
              <ul>
                {s.optimizedBreakdown.map((c, j) => (
                  <li key={j} style={{ marginBottom: "10px" }}>
                    <b>{c.name}</b> | Old: ${c.oldCost} → New: ${c.newCost} | Savings: ${c.saving} <br />
                    Rule: {c.rule} <br />
                    Reason: {c.reason}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
