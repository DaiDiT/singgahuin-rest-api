const { FotoKosan, Kosan } = require('../models')
const responseHandler = require('../handlers/response.handler')
const path = require('path')
const fs = require('fs')

const getFotoKosan = async (req, res) => {
    try {
        const fotoKosan = await FotoKosan.findByPk(req.params.id);
    
        if (!fotoKosan) return responseHandler.notFound(res, "Foto Kosan not found");
    
        const filePath = path.join(__dirname, '..', fotoKosan.url);
    
        return res.sendFile(filePath);
    } catch (err) {
        responseHandler.error(res);
    }
}

const addFotoKosan = async (req, res) => {
    try {
        const kosan = await Kosan.findByPk(req.body.kosanId)

        if (!kosan) return responseHandler.notFound(res, "Kosan not found")
        
        let uploadedFiles = []

        for (const file of req.files) {
            const newFoto = await FotoKosan.create({
                kosanId: kosan.id,
                nama: file.filename,
                url: file.path
            })

            uploadedFiles.push(newFoto.nama)
        }

        responseHandler.created(res, "Foto Kosan successfully added", {
            kosanId: kosan.id,
            uploadedFiles
        })
    } catch (err) {
        console.log(err)
        responseHandler.error(res);
    }
}

const deleteFotoKosan = async (req, res) => {
    try {
        const fotoKosan = await FotoKosan.findByPk(req.params.id)

        if (!fotoKosan) return responseHandler.notFound(res, "Foto Kosan not found")
        
        let kosanId = fotoKosan.kosanId
        let nama = fotoKosan.nama

        fs.unlink(fotoKosan.url, (err) => {
            if (err) {
                console.error(`Error deleting file: ${fotoKosan.url}`, err)
                return responseHandler.error(res, "Error deleting file")
            }
        })

        await fotoKosan.destroy()

        responseHandler.ok(res, "Foto Kosan successfully deleted", {
            kosanId,
            nama
        })
    } catch (err) {
        responseHandler.error(res)
    }
}

module.exports = { getFotoKosan, addFotoKosan, deleteFotoKosan }
