const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');

const db = require('../db/db');
const isLoggedIn = require('../middleware/auth');

const router = express.Router();

router.get('/users', isLoggedIn, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT user_id, firstname, lastname FROM users');
        res.status(200).send({ users: rows });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.post('/users/signup', async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body;
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if(rows.length > 0) {
            return res.status(401).send('User already exists! Please try again!');
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const result = await db.query('INSERT INTO users(firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING *', 
        [firstname, lastname, email, hashedPassword]);

        const user = result.rows[0];
        delete user.email;
        delete user.password;

        res.status(201).send({ user });
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
        const user = rows[0];
        delete user.email;
        delete user.password;

        res.status(200).send({ user, authToken });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.post('/users/logout', (req, res) => {
    res.send('logged out');
});

router.delete('/posts/:id', isLoggedIn, async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { rows } = await db.query('DELETE FROM posts WHERE post_id = $1 AND user_id = $2 RETURNING *', [id, req.user_id]);

        if(rows.length === 0) {
            return res.status(404).send('Post was not deleted!');
        }

        res.status(200).send({id: rows[0].post_id});
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.get('/posts', isLoggedIn, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT * FROM posts WHERE user_id = $1', [req.user_id]);
        res.status(200).send({ posts: rows });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.get('/posts/all', isLoggedIn, async (req, res) => {
    try {
        const { rows } = await db.query('SELECT users.user_id, firstname, lastname, post_id, content, date FROM users INNER JOIN posts ON users.user_id=posts.user_id');
        res.status(200).send({ posts: rows });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.post('/posts', isLoggedIn, async (req, res) => {
    try {
        const { content, date } = req.body;
        const { rows } = await db.query('INSERT INTO posts(user_id, content, date) VALUES($1, $2, $3) RETURNING post_id', [req.user_id, content, date]);
        const post_id = rows[0].post_id;

        const postData = await db.query('SELECT users.user_id, firstname, lastname, post_id, content, date FROM users INNER JOIN posts ON users.user_id=posts.user_id AND posts.post_id=$1', [post_id]);
        const post = postData.rows[0];
        
        res.status(200).send({ post });
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

router.put('/posts/:id', isLoggedIn, async (req, res) => {
    try {
        const { content } = req.body;
        const { id } = req.params;

        const { rows } = await db.query('UPDATE posts SET content = $1 WHERE post_id = $2 AND user_id = $3 RETURNING *', [content, id, req.user_id]);

        if(rows.length === 0) {
            return res.status(404).send('Post was not updated!');
        }

        res.status(200).send({post: rows[0]});
    } catch(err) {
        res.status(500).send('Server error!');
    }
});

module.exports = router;