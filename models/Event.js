const mongooose = require('mongoose');
const { Schema } = mongooose;

const eventSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String},
    category: {type: String},
    venue: {type: String},
    date: {type: Date, required: true},
    time: {type: String},
    seatCapacity: {type: Number, required: true},
    bookedSeats: {type: Number, default:0},
    price: {type: Number, required:true}
})

module.exports = mongooose.model('Event', eventSchema)