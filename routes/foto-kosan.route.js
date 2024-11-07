const express = require('express')
const fotoKosanController = require('../controllers/foto-kosan.controller.js')

const router = express.Router()

router.get('/:id', fotoKosanController.getFotoKosan)

router.delete('/:id', fotoKosanController.deleteFotoKosan)

module.exports = router
