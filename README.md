Title: La Aries Event Ticketing System

description: This Event Ticketing System allows admins to create events and users to book those events.

how to install from terminal:

2. clone the repository into your folder

2. npm install express mongoose jsonwebtoken bcryptjs dotenv validator

setup steps:

1. In MOngoDB create a database with 3 collections: Bookings, Events, Users

2. create a .env folder and replace variables from .env.example folder with yours

environment variables:
MONGODB - replace with your mongoDB database link
JWT_SECRET - your secret key for authentication
PORT - the port you will use for the project server

How to run locally:
Do setup and installation steps then in terminal -> node server.js
