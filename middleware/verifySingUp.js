const { getUserByEmail } = require('../model');
const { logger } = require('../utils');

const verifySingUp = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
            phone
        } = req.body;

        if (!(email && password && name && phone)) {
            res.status(400).json({ message: 'Todos los campos son requeridos' });
            return;
        }
        if (password.length < 8) {
            res.status(400).json({ message: 'El password debe tener mínimo 8 caracteres'});
            return;
        }
        // Chequeando si el usuario existe
        // Validar si el usuario existe en el JSON
        try {
            const {
                email
            } = req.body;
            const oldUser = await getUserByEmail(email);
            if (oldUser) {
                logger.debug(`Se ha encontrado el usuario ${JSON.stringify(oldUser, null, 4)}`);
                res.status(409).json({
                    message: `usuario ${oldUser.email} existe, inicie login en http://localhost:3000/`,
                });
                return;
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: error.message });
            return;
        }
        next();
    } catch (error) {
        logger.error(error);
        res.status(500).json({ message: error.message });
        return;
    }
}

module.exports = verifySingUp;