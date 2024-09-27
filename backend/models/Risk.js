const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema({
  category: { type: String, required: true },
  score: { type: Number, required: true },
  riskLevel: { type: String, required: true }, // Low, Medium, High
});

module.exports = mongoose.model('Risk', riskSchema);
