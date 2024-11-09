const express = require("express")
const bodyParser = require("body-parser")
require("dotenv").config()

const app = express()
const port = process.env.PORT

const sequelize = require("./config/db.js")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const routes = require("./routes/index.route.js")

app.use("/api/v1", routes)
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
    console.log(`Server started on ${port}`)
})

module.exports = app