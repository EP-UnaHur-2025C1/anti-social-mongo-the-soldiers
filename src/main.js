const express = require('express');
require('dotenv').config()
const bd = require('./config/database');
const app = express();

bd.connectBD();

app.use('/', (req, res) => {
    res.status(200).send('OK');
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Ready in the PORT ${PORT}`)
})