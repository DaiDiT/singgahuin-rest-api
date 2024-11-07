const { FotoKosan } = require('../models')
const responseHandler = require('../handlers/response.handler')
const path = require('path')
const fs = require('fs')

const getFotoKosan = async (req, res) => {
    try {
        const { fotoId } = req.params;
    
        const fotoKosan = await FotoKosan.findByPk(fotoId);
    
        if (!fotoKosan) return responseHandler.notFound(res, "Foto Kosan not found");
    
        const filePath = path.join(__dirname, '..', fotoKosan.url);
    
        return res.sendFile(filePath);
    } catch (error) {
        responseHandler.error(res);
    }
}

const deleteFotoKosan = async (req, res) => {
    try {
        const fotoKosan = await FotoKosan.findByPk(req.params.id)

        if (!fotoKosan) return responseHandler.notFound(res, "Foto Kosan not found")

        fs.unlink(fotoKosan.url, (err) => {
            if (err) {
                console.error(`Error deleting file: ${fotoKosan.url}`, err)
                return responseHandler.error(res, "Error deleting file")
            }
        })

        await fotoKosan.destroy()

        responseHandler.ok(res, { message: "Foto Kosan deleted successfully" })
    } catch (error) {
        responseHandler.error(res)
    }
}

module.exports = { getFotoKosan, deleteFotoKosan }
