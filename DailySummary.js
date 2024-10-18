const mongoose = require('mongoose');

const DailySummarySchema = new mongoose.Schema({
    city: String,
    date: { type: Date, default: Date.now },
    averageTemp: Number,
    maxTemp: Number,
    minTemp: Number,
    dominantCondition: String
});

module.exports = mongoose.model('DailySummary', DailySummarySchema);
