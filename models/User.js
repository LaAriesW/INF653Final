const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const validator = require('validator')

const userSchema = new Schema({
    name: {type: String, required:true},
    email:{type: String, required:true, unique:true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password:{type: String, required:true},
    role:{type:String, enum:['user','admin'], default: 'user'}
})

userSchema.pre('save', async function (){
    if (!this.isModified('password'))
        return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

module.exports = mongoose.model('user', userSchema)