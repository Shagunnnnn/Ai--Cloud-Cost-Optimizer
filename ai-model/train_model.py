# train_model.py
import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# --- Example training data (you can extend later with real DB export) ---
# Here we map input feature "cost" to "optimized_cost"
data = {
    "cost": [50, 100, 150, 200, 300, 400, 500],
    "optimized_cost": [40, 75, 120, 150, 225, 300, 375]  # example targets
}
df = pd.DataFrame(data)

X = df[["cost"]]
y = df["optimized_cost"]

model = LinearRegression()
model.fit(X, y)

# Save model
joblib.dump(model, "cost_model.pkl")
print("✅ Model trained & saved as cost_model.pkl")
