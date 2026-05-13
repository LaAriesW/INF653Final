const Event = require('../models/Event')
const Booking = require('../models/Booking')

const getAllEvents = async (req, res) => {
    try {
        const query = {};
        
        if(req.query.category){
            query.category = req.query.category;
        }
        
        if(req.query.date){
            if (req.query.date) {
            const start = new Date(req.query.date);
            const end = new Date(req.query.date);
            end.setDate(end.getDate() + 1);
            query.date = { $gte: start, $lt: end };
        }
        }

        const events = await Event.find(query);
        res.status(200).json(events);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getEventById = async (req, res) => {
    try{
        const event = await Event.findById(req.params.id)
        if(!event) {
            return res.status(404).json({message: 'Event not found'});
        }
        res.status(200).json(event);
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const createEvent = async (req, res) => {
    try{
        if(req.user.role != 'admin'){
            return res.status(401).json({message: 'not authorized. Admin access only.'})
        }

        const {title, description, category, venue, date, time,
            seatCapacity, bookedSeats, price} = req.body

        const eventEntry = {
            'title': title,
            'description': description || undefined,
            'category': category || undefined,
            'venue': venue || undefined,
            'date': date,
            'time': time || undefined,
            'seatCapacity': seatCapacity,
            'bookedSeats': bookedSeats || undefined,
            'price': price || undefined
        }

        const event = await Event.create(eventEntry);
        res.status(201).json(event);
    } catch (err){
        res.status(500).json({message: err.message});
    }
}

const updateEvent = async (req, res) => {
    try{
        if(req.user.role != 'admin'){
            return res.status(401).json({message: 'not authorized. Admin access only.'})
        }

        const id = req.params.id;
        const currentEventEntry = await Event.findById(id);

        const {title, description, category, venue, date, time,
            seatCapacity, bookedSeats, price} = req.body
        
        const hasBookings = await Booking.exists({event: id});
        //HAS UPDATED BOOKED SEATS AND CAPACITY
        if(bookedSeats && seatCapacity){
            if(hasBookings && seatCapacity < bookedSeats){
            return res.status(400).json({message: 'Cannot have less seats available than booked seats'});
            }
        }
        //HAS UPDATED SEAT CAPACITY ONLY (COMPARE TO CURRENT)
        else if (seatCapacity){
            if(hasBookings && (seatCapacity < currentEventEntry.bookedSeats)){
                return res.status(400).json({message: 'Cannot have less seats available than booked seats'});
            }
        }

        const eventEntry = {
            'title': title,
            'description': description || undefined,
            'category': category || undefined,
            'venue': venue || undefined,
            'date': date,
            'time': time || undefined,
            'seatCapacity': seatCapacity,
            'bookedSeats': bookedSeats || undefined,
            'price': price || undefined
        }

        const event = await Event.findByIdAndUpdate(id, eventEntry, {new: true});
        res.status(201).json(event);
    } catch (err){
        res.status(500).json({message: err.message});
    }
}

const deleteEvent = async (req, res) => {
    try {
        if(req.user.role != 'admin'){
            return res.status(401).json({message: 'not authorized. Admin access only.'})
        }
        const id = req.params.id;

        const hasBookings = await Booking.exists({event: id});
        if(hasBookings){
            return res.status(400).json({message: 'Cannot delete event with existing Bookings'});
        }

        const event = await Event.findByIdAndDelete(id);
         res.status(201).json(event);
        } catch (err){
            res.status(500).json({message: err.message});
        }
    }


module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };