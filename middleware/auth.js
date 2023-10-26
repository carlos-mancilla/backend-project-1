const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const { logger } = require('../utils');

const TOKEN_KEY = process.env.TOKEN_KEY;

const verifyToken = async (req, res, next) => {
    let token;
    if (req.headers["authorization"]) {
        token = (req.headers["authorization"].split(' '))[1];
    } else {
        token = req.body.token || req.query.token;
    }
    logger.debug('token:', token);
    if (!token) {
        res.status(403).json({ message: 'Un token es requerido para la autorización'});
        return;
    }
    try {
        const decoded = await verify(token, TOKEN_KEY);
        logger.debug('decoded:', decoded);
    } catch (err) {
        res.status(401).json({ message: 'Token no valido, acceso denegado'});
        logger.error('error:', err);
        return;
    }
    next();
};

module.exports = verifyToken;