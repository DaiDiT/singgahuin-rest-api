const jsonwebtoken = require("jsonwebtoken")
const adminModel = require("../models/admin.model.js")
const responseHandler = require("../handlers/response.handler.js")
const tokenMiddleware = require("../middlewares/token.middleware.js")
const { Op } = require('sequelize');

const register = async (req, res) => {
    try {
        const checkAdmin = await adminModel.findOne({
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

        admin.password = undefined
        admin.salt = undefined

        responseHandler.created(res, {...admin.toJSON()})
    } catch {
        responseHandler.error(res)
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
    
        const admin = await adminModel.findOne({
            where: { username },
            attributes: ['id', 'username', 'password', 'salt'] 
        })
    
        if (!admin) return responseHandler.badRequest(res, "Admin didn't exist")
    
        if (!admin.validPassword(password)) return responseHandler.badRequest(res, "Wrong password")
    
        const token = jsonwebtoken.sign(
            { data: admin.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "24h" }
        )
    
        admin.password = undefined
        admin.salt = undefined
    
        responseHandler.ok(res, {
            token,
            ...admin.toJSON(),
        })
    } catch {
        responseHandler.error(res)
    }
}

const updatePassword = async (req, res) => {
    try {
        const { password, newPassword } = req.body
    
        const admin = await adminModel.findByPk(req.admin.id)
    
        if (!admin) return responseHandler.notFound(res)
        
        if (!admin.validPassword(password)) return responseHandler.badRequest(res, "Wrong password")
    
        admin.setPassword(newPassword)

        await admin.save()
    
        responseHandler.ok(res, {"message": "Password updated!"})
    } catch {
        responseHandler.error(res)
    }
}

module.exports = { register, login, updatePassword }