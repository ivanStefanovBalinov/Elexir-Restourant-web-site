const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'You must provide a name'],
        minLength: 2,
        maxLength: 100,
    },
    email: {
        type: String,
        required: [true, 'You must provide an email'],
        match: [
            /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/,
            'Invalid Email Adress',
        ],
    },
    subject: {
        type: String,
        required: [true, 'You must provide a subject'],
        minLength: 10,
        maxLength: 200,
        match: [/^[A-Z]/, 'Subject should start with a capital letter'],
    },
    message: {
        type: String,
        required: [true, 'You must provide a message'],
        minLength: 10,
        maxLength: 500,
    },
});

const ContactMail = mongoose.model('Contact', ContactSchema);

module.exports = ContactMail;
