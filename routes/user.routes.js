const express = require('express');
const router = express.Router();
const {
    getUsers,
    getUserById
} = require('../controller');

/**
Consulta todos los usuarios
Ejemplo:
method: GET
url: http://localhost:3001/users
*/
router.get('/', getUsers);

/**
Consulta un usuario por id. Requiere token.
Ejemplo:
method: GET
url: http://localhost:3001/users/:id
*/
router.get('/user/:id', getUserById);

module.exports = router;
