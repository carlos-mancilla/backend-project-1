const fs = require('fs/promises');
const { 
    getUserId,
    logger
} = require('../utils');

const bdPath = `${__dirname}/../${process.env.DATABASE_FILE}`;

logger.debug('bdPath:' + bdPath);

const getUsers = async (req, res) => {
    try {
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        res.json(usersBd);
    } catch (error) {
        logger.error(error);
        res.status(500).json({message: error.message});
    }
}

const createUser = async (req, res) => {
    try {
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        const { user } = req.body;
        user.id = getUserId(usersBd);
        logger.debug('user:' , user);
        usersBd.users.push(user);
        logger.debug('usersBd:' , usersBd);
        await fs.writeFile(bdPath, JSON.stringify(usersBd));
        res.status(201).json(user);
    } catch (error) {
        logger.error(error);
        res.status(500).json({message: error.message});
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        logger.debug('id:' , id);
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        const user = usersBd.users.find((u) => u.id === Number(id));
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
    createUser,
    getUserById
}