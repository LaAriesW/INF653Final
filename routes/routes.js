const express = require('express');
const  { validateUser } = require('../middleware/auth')
const {createUser, login} = require('../controllers/userController')
const booking = require('../controllers/bookingController')
const event = require('../controllers/eventController')
const router = express.Router();


// USER ROUTES
router.post('/auth/register', createUser)

router.post('/auth/login', login )

//EVENT ROUTES
router.get('/events', validateUser, event.getAllEvents)

//router.get('/events/category', validateUser, event.getEventsByCategory)

//router.get('/events/date', validateUser, event.getEventsByDate)

router.get('/events/:id', validateUser, event.getEventById)

router.post('/events', validateUser, event.createEvent)

router.put('/events/:id', validateUser, event.updateEvent)

router.delete('/events/:id', validateUser, event.deleteEvent)

//BOOKING ROUTES
router.get('/bookings', validateUser, booking.getAllBookings )

router.get('/bookings/:id', validateUser, booking.getBookingById)

router.post('/bookings', validateUser, booking.createBooking)

module.exports = router;