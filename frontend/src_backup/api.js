export async function optimizeCost(cost) {
  const response = await fetch("http://127.0.0.1:7000/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cost }),
  });

  return response.json();
}
