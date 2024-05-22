const status = require('http-status');
const jwt = require('jsonwebtoken');

const AppError = require('../utils/AppError');

const SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
    // This middleware makes sure that the user is logged in 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) // No token, return error 
        throw new AppError("AuthToken is required", status.UNAUTHORIZED);

    jwt.verify(token, SECRET, (err, decodeToken) => {

        if (err) // Token expire or not matching user, return error 
            throw new AppError("Expire token", status.UNAUTHORIZED);

        req.decodeToken = decodeToken;

        next(); // it's logged, continua 
    });
}

module.exports = auth;