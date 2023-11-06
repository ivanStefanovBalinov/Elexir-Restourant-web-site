const express = require('express');
const router = express.Router();
const { authJWT } = require('../middleware/authentication');
const {
    signIn,
    loginUserAuthPassportLocal,
    userLogout,
    confirmRegistration,
    changePassword,
    resetPasswordEmail,
    findUser,
    accountChangePassword,
} = require('../controllers/User.controller');

router.post('/signIn', signIn);
router.post('/login', loginUserAuthPassportLocal);
router.get('/logout', userLogout);
router.get('/userProfile', authJWT);
router.post('/confirm/:confirmationCode', confirmRegistration);
router.patch('/userProfile/changePassword', changePassword);
router.post('/userProfile/resetPassword', resetPasswordEmail);
router.patch('/userProfile/accountChangePassword', accountChangePassword);
router.get('/userProfile/findUser/:id', findUser);

module.exports = router;
