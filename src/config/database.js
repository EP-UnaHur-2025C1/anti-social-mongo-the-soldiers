/*const mongoose = require('mongoose')

const connectBD = async () => {
    await mongoose.connect('mongodb://localhost:27017/post_system')
        .then(() => {
            console.log('Connected to the database successfully');
        }).catch((error) => {
            console.error('Error connecting to the database:', error);
        })
}

module.exports = {
    connectBD
}*/


const mongoose = require('mongoose')
require('dotenv').config()

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
}

module.exports = conectarDB

