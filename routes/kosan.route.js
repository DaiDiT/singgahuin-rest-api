const express = require('express')
const kosanController = require('../controllers/kosan.controller.js')
const auth = require("../middlewares/token.middleware.js")
const upload = require('../middlewares/multer')

const router = express.Router()

router.post('/', auth, upload.array('photos', 10), kosanController.createKosan)

router.put('/:id', auth, upload.array('photos', 10), kosanController.updateKosan)

router.delete('/:id', auth, kosanController.deleteKosan)

router.get('/', kosanController.getAllKosan)

router.get('/:id', kosanController.getKosanById)

module.exports = router