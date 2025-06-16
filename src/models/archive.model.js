const mongoose = require('mongoose');

const archiveSchema = new mongoose.Schema({
    imagenes: {
        type: String,
        required: true
    }
}, {
    versionKey: false 
});

module.exports = mongoose.model('Archive', archiveSchema);
