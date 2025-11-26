import React, { useState } from "react";

function App() {
  const [serviceName, setServiceName] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState(null);

  const handleOptimize = async () => {
    try {
      const response = await fetch("http://127.0.0.1:7000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cost: parseFloat(cost), // Python ML model only needs cost
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error optimizing:", error);
      setResult({ error: "❌ Failed to connect to AI Engine" });
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>🌩 AI Cloud Cost Optimizer (ML Version)</h1>

      <div style={{ marginBottom: "20px" }}>
        <label><b>Service Name: </b></label>
        <input
          type="text"
          placeholder="Enter Cloud Service Name"
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <label><b>Cost ($): </b></label>
        <input
          type="number"
          placeholder="Enter Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>

      <button onClick={handleOptimize}>Run AI Optimization</button>

      {result && (
        <div style={{ marginTop: "30px", textAlign: "left", display: "inline-block" }}>
          <h3>AI Optimization Result:</h3>

          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <div>
              <p><b>Optimized Cost:</b> ${result.optimized_cost}</p>
              <p><b>Savings:</b> ${result.savings}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
