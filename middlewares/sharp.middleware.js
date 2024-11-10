const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const responseHandler = require("../handlers/response.handler.js")

const removeMetadata = async (req, res, next) => {
    try {
        if (req.files) {
            for (const file of req.files) {
                const filePath = path.join(__dirname, '..', file.path)

                const data = await sharp(filePath)
                    .resize({
                        height: 720,
                        withoutEnlargement: true
                    })
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toBuffer()

                await fs.promises.writeFile(filePath, data)
            }
        }
        next()
    } catch (err) {
        console.log(err)
        return responseHandler.error(res, "Error processing image metadata and resizing")
    }
}

module.exports = { removeMetadata }