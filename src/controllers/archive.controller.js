const Archive = require('../models/archive.model');

const uploadArchive = async (req, res) => {
    try {
        // IMPORTANTE: req.archive no existe, el archivo está en req.file
        if (req.file) {
            const PORT = process.env.PORT;
            const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;

            // Crear el documento en MongoDB
            const newArchive = await Archive.create({ imagenes: imageUrl });

            return res.status(201).json({
                message: 'Archive uploaded successfully',
                data: newArchive
            });
        } else {
            return res.status(400).json({ message: 'No file uploaded' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error uploading archive' });
    }
};

const getArchives = async (req, res) => {
    try {
        const archives = await Archive.find();
        return res.status(200).json({
            message: 'Archives retrieved successfully',
            data: archives
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error fetching archives' });
    }
}

const removeArchive = async (req, res) => {
    try {
        const { id } = req.params;

        const archiveToDelete = await Archive.findById(id);
        if (!archiveToDelete) {
            return res.status(404).json({ message: 'Archive not found' });
        }

        await Archive.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Archive deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error deleting archive' });
    }
}

module.exports = {
    uploadArchive,
    getArchives,
    removeArchive
};
