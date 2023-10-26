const fs = require('fs/promises');
const { 
    logger
} = require('../utils');
const {
    getAllUsers,
    getUserById: getUsrById
} = require('../model');

const bdPath = `${__dirname}/../${process.env.DATABASE_FILE}`;

logger.debug('bdPath:' + bdPath);

const getUsers = async (req, res) => {
    try {
        const usersBd = await getAllUsers();
        logger.debug('usersBd:' , usersBd);
        res.json(usersBd);
    } catch (error) {
        logger.error(error);
        res.status(500).json({message: error.message});
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUsrById(id);
        if (user) {
            res.json(user);
            return;
        }
        res.status(404).json({message: 'Usuario no encontrado'});
    } catch (error) {
        logger.error(error);
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getUsers,
    getUserById
}