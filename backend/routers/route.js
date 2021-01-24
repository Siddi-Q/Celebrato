const db = require('../db/db');
const express = require('express');

const router = express.Router();

router.post('/users/signup', (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log('signup:', req.body);

    db.query('SELECT * FROM users WHERE email = $1', [email])
    .then(result => {
        if(result.rows.length > 0) {
            res.status(401).send('User already exists! Please try again!');
        } else {
            db.query('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', 
            [firstname, lastname, email, password])
            .then(result => res.status(201).send('Signed up!'))
            .catch(err => {
                console.error("inside err:", err);
                res.status(500).send('Server error!');
            })
        }
    })
    .catch(err => {
        console.error("outside err:", err);
        res.status(500).send('server error!');
    })
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