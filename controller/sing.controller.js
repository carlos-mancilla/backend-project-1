const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const util = require('util');
const sign = util.promisify(jwt.sign);
const { 
    addUser, 
    getUserByEmail,
    getAllUsers 
} = require('../model');
const { 
    logger,
    getUserId 
} = require('../utils');

const signup = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phone
        } = req.body;

        const salt = await bcrypt.genSalt(10);
        logger.debug('Salt generado: ' + salt);
        const encryptedPassword = await bcrypt.hash(password, salt);
        logger.debug('\nPassword encriptado: ' + encryptedPassword);
        const usersBd = await getAllUsers();
        const id = await getUserId(usersBd);

        const user = await addUser({
            id,
            name,
            email: email.toLowerCase(), 
            password: encryptedPassword,
            phone
        });

        const token = await sign(
            {
                userId: user.id,
                email
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "15m",
            }
        );
        logger.debug("\nToken Generado: " + token);

        res.status(201).json({
            user,
            token
        });
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: error.message });
    }
}

const signin = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!(email && password)) {
            res.status(400).json({ message: 'Todos los datos son requeridos, email y password' });
            return;
        }

        const user = await getUserByEmail(email);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = await sign(
                {
                    userId: user.id,
                    email
                },
                process.env.TOKEN_KEY, 
                {
                    expiresIn: "15m",
                }
            );

            logger.debug("Usuario: " + email + "\nToken: " + token);

            res.status(200).json({
                token,
                message: 'Autenticado'
            });
            return;
        }
        res.status(401).json({ message: 'Credenciales invalidas'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signup,
    signin
}