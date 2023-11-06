const User = require('../models/User-Schema/User.model');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors');
const passport = require('../middleware/passportConfig');
const sendMail = require('./EmailSender');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config({ path: '../.env' });

//Register
const signIn = async (req, res) => {
    let {
        userName,
        email,
        password,
        confirmPassword,
        country,
        address,
        phoneNumber,
        confirmationCode,
    } = req.body;

    if (
        !userName ||
        !email ||
        !password ||
        !confirmPassword ||
        !address ||
        !phoneNumber
    ) {
        throw new BadRequestError('Please Fill all Fields');
    }

    if (password !== confirmPassword) {
        throw new BadRequestError('Password do not match!');
    }
    const confirmationToken = Date.now() * 11;
    const newUser = await User.create({
        userName: userName,
        email: email,
        password: bcrypt.hashSync(password, 10),
        country: country,
        address: address,
        phoneNumber: phoneNumber,
        confirmationCode: confirmationToken,
    });
    const token = newUser.createJWT();

    if (!newUser) {
        res.status(StatusCodes.EXPECTATION_FAILED).send(
            'Registration Failed. Please try again...',
        );
    }
    res.status(StatusCodes.CREATED).json({
        user: { name: newUser.userName },
        message: 'User was registered successfully! Please check your email',
        token,
    });

    const templateName = 'emailTemplate';
    sendMail(
        newUser.userName,
        newUser.email,
        newUser.confirmationCode,
        null,
        templateName,
    );
};

//Login
const loginUserAuthPassportLocal = async (req, res, next) => {
    passport.authenticate(
        'local',
        { successRedirect: '/', failureRedirect: '/login' },
        (err, user, info) => {
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).send(err);
            } else if (user) {
                return res
                    .status(StatusCodes.OK)
                    .cookie('token', user.createJWT())
                    .json({
                        id: user._id,
                        userName: user.userName,
                        role: user.role,
                        message: 'Successfully Logged In',
                    });
            } else {
                return res.status(StatusCodes.NOT_FOUND).json(info);
            }
        },
    )(req, res, next);
};

//Logout
const userLogout = (req, res, next) => {
    req.logout(function (err) {
        if (err) return next(err);
        res.redirect('/');
    });
};

//Confirm Registration
const confirmRegistration = async (req, res, next) => {
    const user = await User.findOne({
        confirmationCode: req.params.confirmationCode,
    });

    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: 'User Not Found.' });
    }

    user.status = 'Active';

    user.save();

    res.status(StatusCodes.OK).send({ message: 'Account is active!' });
};

//Email Sender for Password Reset
const resetPasswordEmail = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: 'User Not Found.' });
    }

    const templateName = 'resetPassword';
    sendMail(user.userName, user.email, null, user.id, templateName);
    res.status(StatusCodes.OK).send({ user: user, email: email });
};

//Change Password
const changePassword = async (req, res) => {
    const { password, confirmPassword, userId } = req.body;

    if (!password || !confirmPassword) {
        throw new BadRequestError('Please Fill all Fields');
    }

    if (password !== confirmPassword) {
        throw new BadRequestError('Password do not match!');
    }

    const user = await User.findOneAndUpdate(
        { _id: userId },
        { password: bcrypt.hashSync(password, 10) },
    );

    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: 'User Not Found' });
    }
    res.status(StatusCodes.OK).json({
        message: 'Password changed successfully. ',
    });
};

const accountChangePassword = async (req, res) => {
    const { oldPassword, password, confirmPassword, userId } = req.body;

    const user = await User.findOne({ _id: userId });
    const comparePasswords = bcrypt.compareSync(oldPassword, user.password);

    if (!password || !confirmPassword) {
        throw new BadRequestError('Please Fill all Fields');
    }
    if (password !== confirmPassword) {
        throw new BadRequestError('Password do not match!');
    }
    if (!user) {
        return res
            .status(StatusCodes.NOT_FOUND)
            .send({ message: 'User Not Found' });
    }
    if (!comparePasswords) {
        return res
            .status(StatusCodes.PRECONDITION_FAILED)
            .json({ message: 'Wrong old password' });
    }

    const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { password: bcrypt.hashSync(password, 10) },
    );
    res.status(StatusCodes.OK).json({
        message: 'Password updated successfully',
    });
};

const findUser = async (req, res) => {
    const user = await User.findOne({
        _id: req.params.id,
    });

    res.status(StatusCodes.OK).json({ user: user });
};

module.exports = {
    signIn,
    loginUserAuthPassportLocal,
    userLogout,
    confirmRegistration,
    changePassword,
    resetPasswordEmail,
    accountChangePassword,
    findUser,
};
