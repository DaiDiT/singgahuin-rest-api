const sharp = require('sharp')
const path = require('path')
const fs = require('fs')
const responseHandler = require("../handlers/response.handler.js")

const removeMetadata = async (req, res, next) => {
    try {
        if (req.files) {
            for (const file of req.files) {
                const filePath = path.join(__dirname, '..', file.path)
                const tempFilePath = path.join(__dirname, '..', 'temp-' + file.filename)

                const image = sharp(filePath)
                const metadata = await image.metadata()

                let resizeOptions = {}
                if (metadata.width > metadata.height) {
                    resizeOptions = { height: 720, withoutEnlargement: true }
                } else {
                    resizeOptions = { width: 720, withoutEnlargement: true }
                }

                const data = await image
                    .resize(resizeOptions)
                    .toFormat('jpeg')
                    .jpeg({ quality: 90 })
                    .toBuffer()

                await fs.promises.writeFile(tempFilePath, data)

                await fs.promises.rename(tempFilePath, filePath)
            }
        }
        next()
    } catch (err) {
        return responseHandler.error(res, "Error processing image metadata and resizing")
    }
}

module.exports = { removeMetadata }