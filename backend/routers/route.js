const db = require('../db/db');
const express = require('express');

const router = express.Router();

router.post('/users/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if(rows.length > 0) {
            return res.status(401).send('User already exists! Please try again!');
        }

        await db.query('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', 
        [firstname, lastname, email, password]);

        res.status(201).send('Signed up!');
    } catch(err) {
        res.status(500).send('Server error!');
    }
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