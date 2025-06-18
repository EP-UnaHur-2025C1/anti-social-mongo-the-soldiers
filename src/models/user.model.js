const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    nickName:{
        type: String,
        require:[true, 'El nombre es obligatorio'],
        minlenght: [2, "Nombre debe tener al menos 2 caracteres"]
    }
}, {strict:false})

const User = mongoose.model('User',userSchema);

module.exports= User;