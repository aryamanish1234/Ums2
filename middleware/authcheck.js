const jwt = require('jsonwebtoken');
const secret ="1234";
const authtoken = require('../controllers/userControllers');
const User = require('../models/user_models');

    /**
     * Verigy token 
     *
     */

exports.veriftToken = (req, res, next) => {
    const token = authtoken.Login;
    console.log(login);
    if (!token) {
        return res.status(403).send({
            message: " There will be No Token "
        })
    }

    jwt.verify(token, secret.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorthorized "
            })
        }
        req.userId = decoded.id;
        next();
    })
}