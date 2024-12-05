const jsonwebtoken = require("jsonwebtoken")
const { Admin } = require('../models')
const responseHandler = require("../handlers/response.handler.js")
const { Op } = require('sequelize');

const register = async (req, res) => {
    try {
        const checkAdmin = await Admin.findOne({
            where: {
                [Op.or]: [
                    { email: req.body.email },
                    { username: req.body.username }
                ]
            }
        })
    
        if (checkAdmin) return responseHandler.badRequest(res, "This email or username is already used")
        
        const admin = Admin.build()
        
        admin.fullName = req.body.fullName
        admin.username = req.body.username
        admin.email = req.body.email
        admin.setPassword(req.body.password)
        
        await admin.save()

        admin.id = undefined
        admin.password = undefined
        admin.salt = undefined

        responseHandler.created(res, "Admin successfully created", {...admin.toJSON()})
    } catch (err) {
        responseHandler.error(res)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
    
        const admin = await Admin.findOne({
            where: { username },
            attributes: ['id', 'fullName', 'username', 'password', 'salt'] 
        })
    
        if (!admin) return responseHandler.badRequest(res, "Admin didn't exist")
    
        if (!admin.validatePassword(password)) return responseHandler.badRequest(res, "Wrong password")
    
        const token = jsonwebtoken.sign(
            { data: admin.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )
    
        admin.id = undefined
        admin.password = undefined
        admin.salt = undefined
    
        responseHandler.ok(res, "Successfully login", {
            token,
            ...admin.toJSON(),
        })
    } catch (err) {
        responseHandler.error(res)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body
    
        const admin = await Admin.findByPk(req.admin.id)
    
        if (!admin) return responseHandler.notFound(res)
        
        if (!admin.validatePassword(password)) return responseHandler.badRequest(res, "Wrong password")
    
        admin.setPassword(newPassword)

        await admin.save()
    
        responseHandler.ok(res, "Password updated!", {
            adminId: admin.id,
            username: admin.username
        })
    } catch (err) {
        responseHandler.error(res)
    }
}

const deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.body.email
            }
        })
    
        if (!admin) return responseHandler.badRequest(res, "This admin is not exist.")
        
        fullName = admin.fullName
        username = admin.username
        email = admin.email

        await admin.destroy()

        responseHandler.ok(res, "Admin successfully deleted", {
            fullName,
            username,
            email
        })
    } catch (err) {
        responseHandler.error(res)
    }
}

module.exports = { register, login, updatePassword, deleteAdmin }