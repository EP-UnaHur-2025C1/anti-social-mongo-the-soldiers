const express = require('express');
require('dotenv').config()
const app = express();

app.use('/', (req, res) => {
    res.status(200).send('OK');
})

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Ready in the PORT ${PORT}`)
})