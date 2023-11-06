const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        minLength: 3,
        maxLength: 20,
        required: [true, 'You must provide an username'],
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'You must provide an email'],
        trim: true,
        match: [
            /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
            'You must provide a valid email',
        ],
    },
    password: {
        type: String,
        bcrypt: true,
        minLength: 6,
        required: [true, "Password can't be empty"],
    },
    registrationDate: {
        type: Date,
        default: Date.now,
    },
    country: {
        type: String,
        default: 'Bulgaria',
    },
    address: {
        type: String,
        trim: true,
        minLength: 8,
        required: [true, 'You must provide an address'],
    },
    phoneNumber: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'You must provide a phone number'],
        match: [/^08\d{8}$/, 'Invalid phone number format'],
    },
    status: {
        type: String,
        enum: ['Pending', 'Active'],
        default: 'Pending',
    },
    confirmationCode: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        default: 'user',
    },
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id, name: this.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME },
    );
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
