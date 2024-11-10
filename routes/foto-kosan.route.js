const express = require('express')
const fotoKosanController = require('../controllers/foto-kosan.controller.js')
const token = require('../middlewares/token.middleware.js')
const upload = require('../middlewares/multer.middleware.js')
const sharp = require('../middlewares/sharp.middleware.js')

const router = express.Router()

router.get('/:id', fotoKosanController.getFotoKosan)

router.post('/', token.auth, upload.array('photos', 10), sharp.removeMetadata, fotoKosanController.addFotoKosan)

router.delete('/:id', token.auth, fotoKosanController.deleteFotoKosan)

module.exports = router