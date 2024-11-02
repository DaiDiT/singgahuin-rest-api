const jsonwebtoken = require("jsonwebtoken");
const responseHandler = require("../handlers/response.handler.js");
const { Admin } = require("../models");

const decodeToken = (req) => {
    try {
        const bearerHeader = req.headers["authorization"];

        if (bearerHeader) {
            const token = bearerHeader.split(" ")[1];

            return jsonwebtoken.verify(
                token,
                process.env.TOKEN_SECRET
            );
        }

        return false;
    } catch {
        return false;
    }
};

const auth = async (req, res, next) => {
    const decodedToken = decodeToken(req);

    if (!decodedToken) return responseHandler.unauthorized(res);

    try {
        const admin = await Admin.findByPk(decodedToken.data);

        if (!admin) return responseHandler.unauthorized(res);

        req.admin = admin;

        next();
    } catch (error) {
        return responseHandler.error(res, "Server error during authentication");
    }
};

module.exports = { auth, decodeToken };
