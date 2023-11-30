const express = require('express');
const {
    sendContactMail,
    getAllContactEmails,
} = require('../controllers/Contacts.controller');
const router = express.Router();


router.get('/', getAllContactEmails);
router.post('/sendMessage', sendContactMail);

module.exports = router;
