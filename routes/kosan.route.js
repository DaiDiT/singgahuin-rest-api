const express = require('express')
const kosanController = require('../controllers/KosanController')
const auth = require("../middlewares/token.middleware.js")
const upload = require('../middlewares/multer')

const router = express.Router()

router.post('/kosan', auth, upload.array('photos', 10), kosanController.createKosan)

router.put('/kosan/:id', auth, upload.array('photos', 10), kosanController.updateKosan)

router.delete('/kosan/:id', auth, kosanController.deleteKosan)

router.get('/kosan', kosanController.getAllKosan)

router.get('/kosan/:id', kosanController.getKosanById)

module.exports = router
