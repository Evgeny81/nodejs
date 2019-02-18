const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const {users} = require('../models');
const {
    jwtSecretKey,
    FBSecretKey,
    FBClientId,
    TwitterId,
    TwitterSecretKey,
    googleId,
    googleSecretKey
} = require('../config');

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
    function(login, password, done) {
        try {
            const userInfo = users[login];
            if (userInfo.password === password) {
                const {email, username, id} = userInfo;
                return done(null, {email, username, id});
            } else {
                return done(true);
            }
        } catch (e) {
            return done(true);
        }
    }
));

passport.use(new FacebookStrategy({
        clientID: FBClientId,
        clientSecret: FBSecretKey,
        callbackURL: "http://localhost:8080/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        if (profile) {
            return cb(null, profile);
        }
        return cb(true, null);
    }
));

passport.use(new TwitterStrategy({
        consumerKey: TwitterId,
        consumerSecret: TwitterSecretKey,
        callbackURL: "http://localhost:8080/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, cb) {
        if (profile) {
            return cb(null, profile);
        }
        return cb(true, null);
    }
));

passport.use(new GoogleStrategy({
        clientID: googleId,
        clientSecret: googleSecretKey,
        callbackURL: "http://localhost:8080/auth/google/callback"
    },
    function(token, tokenSecret, profile, cb) {
        if (profile) {
            return cb(null, profile);
        }
        return cb(true, null);
    }
));

// standart authorization (task 2)
const authUser = (req, res) => {
    try {
        const userInfo = users[req.body.login];
        if (userInfo.password === req.body.password) {
            const {email, username, id} = userInfo;
            const token = jwt.sign({ id, username }, jwtSecretKey);
            return res.json({code: 200, message: 'OK', data: {user: {email, username}}, token});
        }
    } catch (e) {
        return res.json({code: 404, message: 'Not found', data: {message: 'try another user or password :('}});
    }
};

// passport authorization (task 5)
const passportLocalAuthUser = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            return res.json({code: 404, message: 'Not found', data: {message: 'try another user or password :('}});
        }
        const {id, username} = user;
        const token = jwt.sign({ id, username }, jwtSecretKey);
        return res.json({code: 200, message: 'OK', data: {user}, token});
    })(req, res, next);
};

const passportFBAuthUser = (props) => props ? passport.authenticate('facebook', {...props}) : passport.authenticate('facebook');
const passportFBAuthUserCB = (req, res, next) => res.json({code: 200, message: 'OK', data: {user: req.user}});
const passportTwitterAuthUser = (props) => props ? passport.authenticate('twitter', {...props}) : passport.authenticate('twitter');
const passportTwitterAuthUserCB = (req, res, next) => res.json({code: 200, message: 'OK', data: {user: req.user}});
const passportGoogleAuthUser = (props) => props ? passport.authenticate('google', {...props}) : passport.authenticate('google');
const passportGoogleAuthUserCB = (req, res, next) => res.json({code: 200, message: 'OK', data: {user: req.user}});

module.exports = {
    authUser,
    passportLocalAuthUser,
    passportFBAuthUser,
    passportFBAuthUserCB,
    passportTwitterAuthUser,
    passportTwitterAuthUserCB,
    passportGoogleAuthUser,
    passportGoogleAuthUserCB
};
