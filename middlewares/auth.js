const jwt = require('jsonwebtoken');
const {jwtSecretKey} = require('../config');

const checkIsUserAuthorized = (req, res, next) => {
    try {
        const token = jwt.verify(req.headers.fakeauthorization, jwtSecretKey); // @LOOK HERE <------ (required header)
        if (token.iat * 1000 < Date.now() - 3600 * 1000) { // Token life time is 1 hour
            throw new Error('Token expired');
        }
        next();
    } catch (e) {
        return res.json({code: 403, message: 'No access', data: {message: 'check your token'}});
    }
}

module.exports = {
    checkIsUserAuthorized
};
