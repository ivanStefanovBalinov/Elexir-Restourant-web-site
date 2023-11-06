const ContactMail = require('../models/Contact-Schema/Contact.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const sendMail = require('./EmailSender');

//Sending email to the bootcamp email trough the contact form in the website
const sendContactMail = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        throw new BadRequestError('Please Fill all Fields');
    }

    const newContactMail = await ContactMail.create({
        name: name,
        email: email,
        subject: subject,
        message: message,
    });

    if (!newContactMail) {
        res.status(StatusCodes.EXPECTATION_FAILED).send(
            'Your message failed to send. Please try again.',
        );
    }

    res.status(StatusCodes.ACCEPTED).json({
        mailContent: newContactMail,
        message: 'Contact mail was sended successfully!',
    });

    const recipient = 'bootcamp.june2023@gmail.com';
    const templateName = 'contactTemplate';

    sendMail(
        newContactMail.name,
        recipient,
        null,
        templateName,
        newContactMail.email,
        newContactMail.subject,
        newContactMail.message,
    );
};

const getAllContactEmails = async (req, res) => {
    try {
        const allEmails = await ContactMail.find();
        res.status(200).json(allEmails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendContactMail,
    getAllContactEmails,
};
