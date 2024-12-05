const express = require("express")
const adminController = require("../controllers/admin.controller.js")
const token = require("../middlewares/token.middleware.js")

const router = express.Router()

router.post("/register", adminController.register)

router.post("/login", adminController.login)

router.put("/", token.auth, adminController.updatePassword)

router.delete("/", adminController.deleteAdmin)

module.exports = router