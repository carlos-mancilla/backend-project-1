const fs = require('fs/promises');
const { 
    getUserId,
    logger
} = require('../utils');


const bdPath = `${__dirname}/../${process.env.DATABASE_FILE}`;

logger.debug('bdPath:' + bdPath);

const getAllUsers = async () => {
    try {
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        const users = usersBd.users.map(u => { 
            return {
                id: u.id,
                name: u.name
            }
         });
         usersBd.users = users
        logger.debug('usersBd:' , usersBd);
        return usersBd;
    } catch (error) {
        logger.error(error);
        return undefined;
    }
}

const addUser = async (user) => {
    try {
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        user.id = getUserId(usersBd);
        logger.debug('user:' , user);
        usersBd.users.push(user);
        logger.debug('usersBd:' , usersBd);
        await fs.writeFile(bdPath, JSON.stringify(usersBd));
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
};

const getUserById = async (id) => {
    try {
        logger.debug('id:' , id);
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        const user = usersBd.users.find((u) => u.id === Number(id));
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

const getUserByEmail = async (email) => {
    try {
        logger.debug('email:' , email);
        const usersBd = JSON.parse(await fs.readFile(bdPath, { encoding: "utf8" }));
        logger.debug('usersBd:' , usersBd);
        const user = usersBd.users.find((u) => u.email === email);
        return user;
    } catch (error) {
        logger.error(error);
        throw error;
    }
}

module.exports = {
    getAllUsers,
    addUser,
    getUserById,
    getUserByEmail
}
