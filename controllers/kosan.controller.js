const { Kosan, FotoKosan } = require('../models')
const responseHandler = require('../handlers/response.handler')
const fs = require('fs')
require("dotenv").config()

const createKosan = async (req, res) => {
    try {
        const kosan = await Kosan.create({
            nama: req.body.nama,
            alamat: req.body.alamat,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            tipe: req.body.tipe,
            deskripsi: req.body.deskripsi,
            fasilitas: req.body.fasilitas,
            hargaKamar: req.body.hargaKamar,
            kamarTersedia: req.body.kamarTersedia,
            kontak: req.body.kontak
        })
    
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                await FotoKosan.create({
                    kosanId: kosan.id,
                    nama: file.filename,
                    url: file.path
                })
            }
        }
  
        responseHandler.created(res, kosan)
    } catch (err) {
        console.log(err, req.params)
        responseHandler.error(res)
    }
}
  
const updateKosan = async (req, res) => {
    try {
        const kosan = await Kosan.findByPk(req.params.id)
    
        if (!kosan) return responseHandler.notFound(res, "Kosan not found")
    
        kosan.nama = req.body.nama || kosan.nama
        kosan.alamat = req.body.alamat || kosan.alamat
        kosan.latitude = req.body.latitude || kosan.latitude
        kosan.longitude = req.body.longitude || kosan.longitude
        kosan.tipe = req.body.tipe || kosan.tipe
        kosan.deskripsi = req.body.deskripsi || kosan.deskripsi
        kosan.fasilitas = req.body.fasilitas || kosan.fasilitas
        kosan.hargaKamar = req.body.hargaKamar || kosan.hargaKamar
        kosan.kamarTersedia = req.body.kamarTersedia || kosan.kamarTersedia
        kosan.kontak = req.body.kontak || kosan.kontak
    
        await kosan.save()
  
        responseHandler.ok(res, kosan)
    } catch (err) {
        console.log(err)
        responseHandler.error(res)
    }
}

const deleteKosan = async (req, res) => {
    try {
        const kosan = await Kosan.findByPk(req.params.id)
    
        if (!kosan) return responseHandler.notFound(res, "Kosan not found")
        
        const fotoKosan = await FotoKosan.findAll({
            where: {
                kosanId: kosan.id
            }
        })
          
        fotoKosan.forEach((foto) => {
            fs.unlink(foto.url, (err) => {
                if (err) {
                    console.error(`Error deleting file: ${foto.url}`, err)
                } else {
                    console.log(`File deleted: ${foto.url}`)
                }
            })
        })

        await FotoKosan.destroy({
            where: {
            kosanId: kosan.id
            }
        })
    
        await kosan.destroy()
    
        responseHandler.ok(res, { message: "Kosan deleted successfully" })
    } catch (err) {
        console.log(err)
        responseHandler.error(res)
    }
}
  
const getAllKosan = async (req, res) => {
    try {
        const { tipe, sortBy } = req.query;

        let whereCondition = {};
        if (tipe) {
            whereCondition.tipe = tipe;
        }

        let orderCondition = [];
        if (sortBy === 'hargaKamar') {
            orderCondition.push([sortBy, 'ASC'])
        } else if (sortBy === 'kamarTersedia') {
            orderCondition.push([sortBy, 'DESC'])
        }

        const kosans = await Kosan.findAll({
            where: whereCondition,
            include: [{
                model: FotoKosan,
                attributes: ['url'],
                limit: 1,
            }],
            order: orderCondition
        });

        const kosansWithImage = kosans.map(kosan => {
            const kosanData = kosan.toJSON();
            if (kosan.FotoKosans.length > 0) {
                kosanData.urlFoto = `${process.env.BASE_URL}/${kosan.FotoKosans[0].url}`;
            } else {
                kosanData.urlFoto = null;
            }
            delete kosanData.FotoKosans;

            return kosanData;
        });

        responseHandler.ok(res, kosansWithImage);
    } catch (err) {
        console.log(err);
        responseHandler.error(res);
    }
}

const getKosanById = async (req, res) => {
    try {
        const kosan = await Kosan.findByPk(req.params.id, {
            include: [{
                model: FotoKosan,
                attributes: ['url'],
            }]
        })

        if (!kosan) return responseHandler.notFound(res, "Kosan not found")

        const kosanData = kosan.toJSON()
        kosanData.foto = kosan.FotoKosans.map(foto => `${process.env.BASE_URL}/${foto.url}`)

        delete kosanData.FotoKosans

        responseHandler.ok(res, kosanData)
    } catch (err) {
        console.log(err)
        responseHandler.error(res)
    }
}

module.exports = { createKosan, updateKosan, deleteKosan, getAllKosan, getKosanById }