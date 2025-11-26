import React, { useState } from "react";

export default function CurrentCostForm({ onOptimize }) {
  const [services, setServices] = useState([
    { name: "", cost: "", usage: "" }
  ]);

  const updateField = (i, field, value) => {
    const updated = [...services];
    updated[i][field] = value;
    setServices(updated);
  };

  const addService = () => setServices([...services, { name: "", cost: "", usage: "" }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (services.some(s => !s.name || s.cost === "")) {
      alert("Fill name and cost for all components");
      return;
    }
    onOptimize({ services });
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Enter Current Cloud Costs</h2>
      {services.map((s, i) => (
        <div key={i} className="service-row">
          <input value={s.name} onChange={e => updateField(i, "name", e.target.value)} placeholder="Service Name" />
          <input type="number" value={s.cost} onChange={e => updateField(i, "cost", e.target.value)} placeholder="Monthly Cost" />
          <input type="number" value={s.usage} onChange={e => updateField(i, "usage", e.target.value)} placeholder="Usage %" />
        </div>
      ))}
      <button type="button" onClick={addService}>+ Add Component</button>
      <button type="submit">Optimize Cost</button>
    </form>
  );
}
