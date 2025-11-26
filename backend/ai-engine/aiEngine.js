// backend/ai-engine/aiEngine.js

const Cost = require('../models/CostModel');

/**
 * Simple AI logic to analyze cost data and return optimization suggestions.
 * This can later be upgraded to real ML/AI using TensorFlow or OpenAI API.
 */

async function analyzeCosts() {
  try {
    const costs = await Cost.find().sort({ date: -1 }).limit(20);
    if (!costs.length) {
      return { message: "No data available yet." };
    }

    // Calculate averages
    const total = costs.reduce((sum, c) => sum + c.totalCost, 0);
    const avg = total / costs.length;

    // Detect spikes
    const highSpends = costs.filter(c => c.totalCost > avg * 1.5);
    const lowSpends = costs.filter(c => c.totalCost < avg * 0.5);

    // Generate insights
    const insights = [];

    if (highSpends.length > 0) {
      insights.push(`⚠️ Detected ${highSpends.length} unusually high cost resources.`);
    }
    if (lowSpends.length > 0) {
      insights.push(`💡 ${lowSpends.length} resources show low utilization — consider downsizing.`);
    }

    if (avg > 1000) {
      insights.push(`🚨 Your average cost per resource is ${avg.toFixed(2)} USD — consider switching to reserved or spot instances.`);
    } else if (avg < 200) {
      insights.push(`✅ Your current cost trend looks healthy. Keep monitoring.`);
    }

    // Suggest random optimizations
    const suggestions = [
      "Use auto-scaling to handle variable workloads efficiently.",
      "Move infrequently accessed data to cheaper cold storage.",
      "Enable budget alerts in your cloud provider dashboard.",
      "Review your on-demand instances; reserved instances may save 40-60%.",
      "Use AI-based scheduling to turn off idle resources automatically."
    ];

    const randomSuggestions = suggestions.sort(() => 0.5 - Math.random()).slice(0, 2);

    return {
      summary: {
        totalCost: total.toFixed(2),
        averageCost: avg.toFixed(2),
        recordCount: costs.length,
      },
      insights,
      suggestions: randomSuggestions
    };

  } catch (err) {
    console.error("Error in AI Engine:", err);
    return { error: "AI analysis failed." };
  }
}

module.exports = { analyzeCosts };
