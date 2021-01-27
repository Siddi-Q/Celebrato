const db = require('../db/db');
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        const authToken = req.header('Authorization').replace('Bearer ', '');
        const decodedToken = jwt.verify(authToken, process.env.jwtKey);
        next();
    } catch(err) {
        res.status(401).send({ message: 'Authentication Error!' });
    }
}

module.exports = isLoggedIn;