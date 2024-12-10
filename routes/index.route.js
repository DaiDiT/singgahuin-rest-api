const express = require("express")
const adminRoute = require("./admin.route.js")
const kosanRoute = require("./kosan.route.js")
const fotoKosanRoute = require("./foto-kosan.route.js")

const router = express.Router()

router.get("/status", (req, res) => {
    res.status(200).json({
        statusCode: 200,
        message: "Server is running"
    });
});

router.use("/admin", adminRoute)
router.use("/kosan", kosanRoute)
router.use("/foto", fotoKosanRoute)

module.exports = router