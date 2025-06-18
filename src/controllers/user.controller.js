const User = require('../models/user.model');
const mongoose = require('mongoose');

//Post de  User
const crearUser = async(req, res) => {
    try {
        const user= new User(req.body);
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

//Get de Users
const obtenerUsers = async(_, res) =>{
    try {
        const users = await User.find();    /* voy a usar un select pero no se que seleccionar */
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//GET de User por Id
const obtenerUser = async(req, res) => {
    try {
       const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID inválido' });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User no encontrado' });
        }
        res.status(200).json(user);  
    } catch (error) {
       res.status(500).json({ error: error.message }); 
    }
};

//Delet User
const eliminarUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userEliminado = await User.findByIdAndDelete(userId);
    if (!userEliminado) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }
    res.json({ message: 'User eliminado', user: userEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el user', error });
  }
};

//Update User
const editarUser = async (req, res) => {
  try {
    const userActualizado = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userActualizado) {
      return res.status(404).json({ message: 'User no encontrado' });
    }
    res.json({ message: 'User actualizado', user: userActualizado });
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar el autor', error });
  }
};



module.exports = {
    crearUser,
    obtenerUsers,
    obtenerUser,
    eliminarUser,
    editarUser
}