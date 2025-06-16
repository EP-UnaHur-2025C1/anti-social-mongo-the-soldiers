const express = require('express');
const conectarDB = require('./config/database');
const { archive, user } = require('./routes/main');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 9001;

app.use('/images', express.static('uploads')); // server static files

//Middleware
app.use(express.json());

//Routers
app.use('/api/archives', archive);
app.use('/api/users', user);


//Conexion MongoDB
conectarDB();

app.listen(PORT, () => {
    console.log(`Ready in the PORT ${PORT}`)
})