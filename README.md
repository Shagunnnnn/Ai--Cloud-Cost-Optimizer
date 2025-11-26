🌤️ AI Cloud Cost Optimizer

A lightweight AI-driven tool that analyzes AWS & Azure cloud service usage and provides real-time cost optimization recommendations.

🚀 Overview

AI Cloud Cost Optimizer helps users reduce cloud expenses by identifying high-cost services and suggesting optimization strategies.
It uses rule-based AI, a Flask backend, and a simple web UI to compute service-wise costs and highlight areas where money is being wasted.

🧠 Features

✔ Analyze AWS & Azure service usage (EC2, S3, VMs, Blob, Network, etc.)
✔ Real-time cost calculation based on user inputs
✔ Rule-based AI engine to detect cost inefficiencies
✔ Detailed breakdown of Compute, Storage, and Network costs
✔ Provides optimization suggestions similar to AWS Trusted Advisor
✔ Simple Flask backend with clean REST API
✔ Interactive frontend to enter cloud usage details

🛠 Tech Stack

Backend: Python, Flask
AI Logic: Rule-Based AI, Threshold-Based Decision Engine
Frontend: HTML, CSS, JavaScript
Data: JSON-based service models
Tools: Git, GitHub

📊 How It Works

User enters details of cloud services (usage hours, storage, bandwidth, etc.)

Backend calculates cost using predefined cloud pricing models

Rule-based AI analyzes usage patterns

Optimizer generates:

High-cost service warnings

Cost breakdown

Suggestions to reduce expenses

🤖 AI Optimization Logic

The rule-based engine checks:

Over-provisioned EC2/VM instances

High network bandwidth consumption

Unused S3/Blob storage

Incorrect service types

Sudden cost spikes

It then suggests steps like:

Reduce instance size

Switch to reserved instances

Optimize data transfers

