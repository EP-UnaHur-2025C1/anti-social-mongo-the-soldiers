const Archive = require('../models/archive.model');
const uploadArchive = async (req, res) => {
  try {
    console.log(req.file);
    const PORT = process.env.PORT || 3000;
    const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;

    const newArchive = await Archive.create({ imagenes: imageUrl });

    res.status(201).json({
      message: 'Archive uploaded successfully',
      data: newArchive
    });
  } catch (error) {
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
    res.status(500).json({
      message: 'Error fetching archives',
      error: error.message
    });
  }
};

const getArchive = async (req, res) => {
  try {
    const archive = await Archive.findById(req.params.id);

    if (!archive) {
      return res.status(404).json({ message: 'Archive not found' });
    }

    res.status(200).json({
      message: 'Archive retrieved successfully',
      data: archive
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching archive',
      error: error.message
    });
  }
};

const removeArchive = async (req, res) => {
  try {
    const archiveToDelete = await Archive.findByIdAndDelete(req.params.id);

    if (!archiveToDelete) {
      return res.status(404).json({ message: 'Archive not found' });
    }

    res.status(200).json({
      message: 'Archive deleted successfully',
      data: archiveToDelete
    });
  } catch (error) {
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