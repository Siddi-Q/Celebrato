const db = require('../db/db');
const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/users/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if(rows.length > 0) {
            return res.status(401).send('User already exists! Please try again!');
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        await db.query('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4)', 
        [firstname, lastname, email, hashedPassword]);

        res.status(201).send('Signed up!');
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if(rows.length === 0) {
            return res.status(401).send('Incorrect email or password!');
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if(!isMatch) {
            return res.status(401).send('Incorrect email or password!');
        }

        const authToken = jwt.sign({ id: rows[0].user_id}, process.env.jwtKey);

        res.status(200).send({ authToken });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.post('/users/logout', (req, res) => {
    console.log('logout:', req.body);
    res.send('logged out');
});

router.delete('/posts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM posts WHERE post_id = $1', [id]);
        res.status(200).send({id});
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.get('/posts', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT users.user_id, firstname, lastname, post_id, content, date FROM users INNER JOIN posts ON users.user_id=posts.user_id;');
        console.log(rows);
        res.status(200).send({ posts: rows });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.post('/posts', async (req, res) => {
    try {
        const { user_id, content, date } = req.body;
        await db.query('INSERT INTO posts(user_id, content, date) VALUES($1, $2, $3)', 
        [user_id, content, date]);

        res.status(200).send('Success!');
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

module.exports = router;