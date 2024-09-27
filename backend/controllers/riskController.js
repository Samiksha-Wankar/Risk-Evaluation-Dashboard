const Risk = require('../models/Risk');

// Get all risks
exports.getRisks = async (req, res) => {
  try {
    const risks = await Risk.find();
    res.json(risks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create new risk
exports.createRisk = async (req, res) => {
  const { category, score, riskLevel } = req.body;
  try {
    const newRisk = new Risk({ category, score, riskLevel });
    await newRisk.save();
    res.status(201).json(newRisk);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
