const Archive = require('../models/archive.model');
const mongoose = require('mongoose');

const uploadArchive = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const PORT = process.env.PORT || 3000;
        const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;

        const newArchive = await Archive.create({ imagenes: imageUrl });

        res.status(201).json({
            message: 'Archive uploaded successfully',
            data: newArchive
        });
    } catch (error) {
        console.error('Error uploading archive:', error);
        res.status(500).json({ 
            message: 'Error uploading archive',
            error: error.message
        });
    }
};
const getArchives = async (req, res) => {
    try {
        const archives = await Archive.find().sort({ createdAt: -1 });
        
        res.status(200).json({
            message: 'Archives retrieved successfully',
            data: archives
        });
    } catch (error) {
        console.error('Error fetching archives:', error);
        res.status(500).json({ 
            message: 'Error fetching archives',
            error: error.message
        });
    }
};
const getArchive = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid archive ID' });
        }

        const archive = await Archive.findById(id);
        
        if (!archive) {
            return res.status(404).json({ message: 'Archive not found' });
        }

        res.status(200).json({
            message: 'Archive retrieved successfully',
            data: archive
        });
    } catch (error) {
        console.error('Error fetching archive:', error);
        res.status(500).json({ 
            message: 'Error fetching archive',
            error: error.message
        });
    }
};
const removeArchive = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid archive ID' });
        }

        const archiveToDelete = await Archive.findByIdAndDelete(id);
        
        if (!archiveToDelete) {
            return res.status(404).json({ message: 'Archive not found' });
        }

        res.status(200).json({ 
            message: 'Archive deleted successfully',
            data: archiveToDelete
        });
    } catch (error) {
        console.error('Error deleting archive:', error);
        res.status(500).json({ 
            message: 'Error deleting archive',
            error: error.message
        });
    }
};

module.exports = {
    uploadArchive,
    getArchives,
    getArchive,
    removeArchive
};