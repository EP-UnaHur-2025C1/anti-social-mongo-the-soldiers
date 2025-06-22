const express = require('express');
const upload = require('../config/storage');
const { archive } = require('../controllers/main');

const router = express.Router();

router.post('/upload', upload.single('archive'), archive.uploadArchive);
router.get('/', archive.getArchives);
router.get('/:id', archive.getArchive);
router.delete('/:id', archive.removeArchive);

module.exports = router;