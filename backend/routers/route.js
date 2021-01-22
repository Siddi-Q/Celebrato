const express = require('express');

const router = express.Router();

router.post('/users/signup', (req, res) => {
    console.log('signup:', req.body);
    res.status(201).send('Signed up!');
});

router.post('/users/login', (req, res) => {
    console.log('login:', req.body);
    res.status(200).send('logged in');
});

router.post('/users/logout', (req, res) => {
    console.log('logout:', req.body);
    res.send('logged out');
});

module.exports = router;