const express = require('express')
const kosanController = require('../controllers/kosan.controller.js')
const token = require("../middlewares/token.middleware.js")
const upload = require('../middlewares/multer.middleware.js')

const router = express.Router()

router.post('/', token.auth, upload.array('photos', 10), kosanController.createKosan)

router.put('/:id', token.auth, upload.array('photos', 10), kosanController.updateKosan)

router.delete('/:id', token.auth, kosanController.deleteKosan)

router.get('/', kosanController.getAllKosan)

router.get('/:id', kosanController.getKosanById)

module.exports = router