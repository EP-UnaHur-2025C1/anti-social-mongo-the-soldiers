const mongoose = require("mongoose");
const Tag = require("../models/tag.model");

// Get all tags
const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tags', details: error.message });
    }
};

// Get tag by ID
const getTag = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const tag = await Tag.findById(id);
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tag', details: error.message });
    }
};

// Create a new tag
const createTag = async (req, res) => {
    try {
        const { tag } = req.body;

        if (!tag) {
            return res.status(400).json({ message: 'Tag field is required' });
        }

        const newTag = new Tag({ tag });
        await newTag.save();

        res.status(201).json(newTag);
    } catch (error) {
        res.status(400).json({ error: 'Error creating tag', details: error.message });
    }
};

// Update tag
const editTag = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const updatedTag = await Tag.findByIdAndUpdate(id, req.body, { new: true });

        if (!updatedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json(updatedTag);
    } catch (error) {
        res.status(400).json({ error: 'Error updating tag', details: error.message });
    }
};

// Delete tag
const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const deletedTag = await Tag.findByIdAndDelete(id);

        if (!deletedTag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        res.status(200).json({ message: 'Tag successfully removed', tag: deletedTag });
    } catch (error) {
        res.status(400).json({ error: 'Error deleting tag', details: error.message });
    }
};

module.exports = {
    getTags,
    getTag,
    createTag,
    editTag,
    deleteTag
};
