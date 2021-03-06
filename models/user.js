const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const config = require('config');
//Joi-object id

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id : this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', userSchema);

function validateUser(user){
    const schema = {
        username: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(6).max(1024).required(),
        isAdmin: Joi.boolean()
    }
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;