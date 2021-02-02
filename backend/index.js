require('dotenv').config();

const express = require('express');
var cors = require('cors');
const router = require('./routers/route');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`listening at port ${port}`));