# ai-service/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    cost = float(data["cost"])

    optimized_cost = round(cost * 0.85, 2)
    savings = round(cost - optimized_cost, 2)

    return jsonify({
        "optimized_cost": optimized_cost,
        "savings": savings
    })

app.run(port=7000)
