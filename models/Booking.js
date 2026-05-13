const mongooose = require('mongoose');
const { Schema } = mongooose;

const bookingSchema = new Schema({
    user: {type: mongooose.Schema.Types.ObjectId, ref: 'User'},
    event: {type: mongooose.Schema.Types.ObjectId, ref: 'Event'},
    quantity: {type: Number, required: true},
    bookingDate: {type: Date, default: Date.now}
})

module.exports = mongooose.model('booking', bookingSchema)