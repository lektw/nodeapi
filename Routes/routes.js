const express = require('express');
const multer = require('multer');
const { uploadHandler, getImagemByIdHandler } = require('../Controller/imagemController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('imagem'), uploadHandler);
router.get('/imagem/:id', getImagemByIdHandler);

module.exports = router;
