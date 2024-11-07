const express = require("express")
const adminController = require("../controllers/admin.controller.js")
const auth = require("../middlewares/token.middleware.js")

const router = express.Router()

router.post("/register", adminController.register)

router.post("/login", adminController.login)

router.put("/", auth, adminController.updatePassword)

module.exports = router