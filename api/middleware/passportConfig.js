const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User-Schema/User.model');
const bcrypt = require('bcryptjs');

//Passport configuration
passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
            .then((user) => {
                if (!user)
                    return done(null, false, {
                        message: 'User with this email not found...',
                    });
                if (user.status !== 'Active') {
                    return done(null, false, {
                        message: 'Pending Account. Please Verify Your Email!',
                    });
                }

                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) console.log(err);
                    if (!isMatch) {
                        return done(null, false, {
                            message: 'Wrong Password.',
                        });
                    }

                    return done(null, user);
                });
            })
            .catch((err) => console.log(err));
    }),
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

module.exports = passport;
