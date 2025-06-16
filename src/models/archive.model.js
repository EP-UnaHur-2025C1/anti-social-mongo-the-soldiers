const moongose = require('mongoose');
const arhiveSchema = new moongose.Schema({
    imagenes: {
        type: String,
        required: true
    }
})
module.exports = moongose.model('archives', arhiveSchema);