const mongoose = require('mongoose');

let tripSchema = mongoose.Schema({
    username: { type: String },
    from: { type: String },
    to: { type: String },
    date: { type: Date, min: [Date.now, 'You cannot travel in the past'] },
    price: { type: Number, min: 1 },
    slots: { type: Number, min: 1, max: 4 },
    passengers: [{}],
    description: { type: String }
});

mongoose.model("Trip", tripSchema);

module.exports = mongoose.model("Trip");