const Tag = require("../models/tag.model");

const getTags = async (req, res) => {
    try {
        const tags = await Tag.find();
        res.status(200).json(tags);
    } catch (error) {
        res.status(500).json({ error: `Error fetching tags` });
    }
};

const getTag = async (req, res) => {
    try {
        const id = req.params.id
        const tag = await Tag.findById(id)
        if(!tag) {
            return res.status(404).json({message: `Tag not found`})
        }
        res.status(200).json(tag)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const createTag = async (req, res) => {
    try {
        const {tag} = req.body
        const newTag = new Tag ({tag})
        await newTag.save()
        res.status(201).json(newTag)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const editTag = async (req, res) => {
    try {
        const id = req.params.id
        const updateTag = await Tag.findByIdAndUpdate(id, req.body, {new:true})
        if(!updateTag) {
            return res.status(404).json({message: 'Tag not found'})
        }
        res.status(200).json(updateTag)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deleteTag = async (req, res) => {
    try {
        const id = req.params.id
        const tagEliminated = await Tag.findByIdAndDelete(id)
        if(!tagEliminated) {
            return res.status(404).json({message: 'Tag not found'})
        }
        res.status(200).json({message: 'tag successfully removed', tag: tagEliminated})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getTags,
    getTag,
    createTag,
    editTag,
    deleteTag
}