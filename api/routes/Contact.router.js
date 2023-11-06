const express = require('express');
const {
    sendContactMail,
    getAllContactEmails,
} = require('../controllers/Contacts.controller');
const router = express.Router();
const ContactMail = require('../models/Contact-Schema/Contact.model');

router.get('/', getAllContactEmails);
router.post('/sendMessage', sendContactMail);

module.exports = router;
