const mongoose = require('mongoose');

const appointment = new mongoose.Schema({
    name: String,
    description: String,
    email: String,
    date: Date,
    time: String,
    finished: Boolean

});

module.exports = appointment;