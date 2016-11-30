const mongoose = require('mongoose');

let tripSchema = mongoose.Schema({
    username: {type: String},
    from: {type: String},
    to: {type: String},
    date: {type: Date}
});

mongoose.model("Trip", tripSchema);

module.exports = mongoose.model("Trip");