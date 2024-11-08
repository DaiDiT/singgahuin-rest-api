const express = require('express')
const fotoKosanController = require('../controllers/foto-kosan.controller.js')
const token = require("../middlewares/token.middleware.js")

const router = express.Router()

router.get('/:id', fotoKosanController.getFotoKosan)

router.delete('/:id', token.auth, fotoKosanController.deleteFotoKosan)

module.exports = router