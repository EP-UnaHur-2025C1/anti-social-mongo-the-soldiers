const express = require('express');
const upload = require('../config/storage');
const { archive } = require('../controllers/main');
const { archiveValidation } = require('../middleware/main');

const router = express.Router();

router.post('/upload', upload.single('archive'), archiveValidation.validateCreateArchive, archive.uploadArchive);
router.get('/', archive.getArchives);
router.get('/:id', archiveValidation.validateArchiveId, archive.getArchive);
router.delete('/:id', archiveValidation.validateArchiveId, archive.removeArchive);


module.exports = router;