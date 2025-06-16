const express = require('express');
const router = express.Router();
const upload = require('../config/storage');
const { archive } = require('../controllers/main');

router.post('/upload', upload.single('archive'), archive.uploadArchive);
router.get('', archive.getArchives);
router.delete('/:id', archive.removeArchive);

module.exports = router;
