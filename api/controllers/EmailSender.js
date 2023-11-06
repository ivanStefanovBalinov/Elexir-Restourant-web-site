const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config({ path: '../.env' });
const OAuth2 = google.auth.OAuth2;
const handleBars = require('nodemailer-express-handlebars');
const path = require('path');

//Credentials
const clientID = process.env.GOOGLE_CLIENT_ID;
const secretKey = process.env.GOOGLE_SECRET_KEY;
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
const gcpUser = process.env.GCP_USER;
const oAuthPlayground = 'https://developers.google.com/oauthplayground';

const OAuth2_client = new OAuth2(clientID, secretKey);
OAuth2_client.setCredentials({ refresh_token: refreshToken });

function sendMail(
    name,
    recipient,
    confirmationCode,
    id,
    templateName,
    emailSender,
    emailSubject,
    emailMessage,
) {
    const accessToken = OAuth2_client.getAccessToken();

    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: gcpUser,
            clientId: clientID,
            clientSecret: secretKey,
            refreshToken: refreshToken,
            accessToken: accessToken,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const handlebarOption = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path.resolve('../api/public/emailTemplate'),
            defaultLayout: false,
        },
        viewPath: path.resolve('../api/public/emailTemplate'),
        extName: '.handlebars',
    };

    transport.use('compile', handleBars(handlebarOption));

    const mailOptions = {
        from: `BootCampTeam <${gcpUser}>`,
        to: recipient,
        subject: 'A Message From Boot Camp Team June 2023',
        template: templateName,
        context: {
            name: name,
            confirmationCode: confirmationCode,
            emailSender: emailSender,
            emailSubject: emailSubject,
            emailMessage: emailMessage,
            id: id,
        },
    };

    transport.sendMail(mailOptions, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message was Successfully Sended', result);
        }
        transport.close();
    });
}

module.exports = sendMail;
