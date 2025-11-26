const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: String,
  cost: Number
});

const costSchema = new mongoose.Schema({
  serviceName: String,
  components: [componentSchema],   // current cost details
  optimizedComponents: [componentSchema], // optimized cost details
  savings: Number,
  totalCurrentCost: Number,
  totalOptimizedCost: Number,
});

module.exports = mongoose.model("Cost", costSchema);


