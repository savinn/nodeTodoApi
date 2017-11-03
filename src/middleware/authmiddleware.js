import jwt from "jsonwebtoken";
import expressJwt from "express-jwt";

const TokenTime = 60 * 60 * 24 * 30; //30 days
const Secret = "W3 Hav3 th3 kn0w h0w";

let authenticate = expressJwt({ secret: Secret });

let generateAccessToken = (req, res, next) => {
    req.token = req.token || {};
    req.token = jwt.sign({
        id: req.user.id,
    }, Secret, {
            expiresIn: TokenTime
        });
    next();
}

let respond = (req, res) => {
    res.status(200).json({
        user: req.user.username,
        token: req.token
    });
}

module.exports = {
    authenticate,
    generateAccessToken,
    respond
}