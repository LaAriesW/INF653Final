const User = require('../models/User')
const jwt = require('jsonwebtoken')
const signToken = (id, role) => jwt.sign({ id, role }, process.env.JWT_SECRET)

const createUser = async (req, res) => {
    try{
        const {name, email, password, role } = req.body;

        const existing = await User.findOne({email});
        if (existing) return res.status(400).json({message: 'Email already in use'});
        
        const userEntry = {
            'name': name,
            'email': email,
            'password': password,
            'role': role || undefined
        }

        const user = await User.create(userEntry)
        res.status(201).json(user);
    } catch (error){
        res.status(500).json({message: error.message});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({ email }).select('+password');
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const token = signToken(user._id, user.role);
        res.json({token});
    } catch (err) {
        res.status(500).json({message: 'Server error', error: err.message});
    }
}

module.exports = { createUser, login };