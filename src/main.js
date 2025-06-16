const express = require('express');
require('dotenv').config()
const bd = require('./config/database');
const { archive } = require('./routes/main');
const app = express();

bd.connectBD();
app.use('/images', express.static('uploads')); // server static files
app.use(express.json());

app.use('/api/archives', archive);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Ready in the PORT ${PORT}`)
})