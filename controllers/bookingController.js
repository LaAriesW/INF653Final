const Booking = require('../models/Booking');

const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({user: req.user._id});
        if(!bookings) {
            res.status(404).json({message: 'no bookings found'})
        }
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({_id: req.params.id, user: req.user._id});
        if(!booking) {
            res.status(404).json({message: 'no booking found'})
        }
        res.status(200).json(booking);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

const createBooking = async (req, res) => {
    try {
        if(req.user.role != 'admin'){
            return res.status(401).json({message: 'not authorized. Admin access only.'})
        }

        const {user, event, quantity, bookingDate} = req.body

        const bookingEntry = {
            user,
            event,
            quantity,
            'bookingDate': bookingDate || undefined
        }

        const booking = await Booking.create(bookingEntry);
        res.status(201).json(booking);
    } catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = { getAllBookings, getBookingById, createBooking };