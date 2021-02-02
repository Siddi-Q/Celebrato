const db = require('../db/db');
const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
    try {
        const authToken = req.header('Authorization').slice(7);
        const decodedToken = jwt.verify(authToken, process.env.jwtKey);
        req.user_id = decodedToken.id;
        next();
    } catch(err) {
        res.status(401).send({ message: 'Authentication Error!' });
    }
}

module.exports = isLoggedIn;