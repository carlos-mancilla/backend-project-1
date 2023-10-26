const express = require('express');
const router = express.Router();
const {
    signup,
    signin
} = require('../controller');


/**
Registro
Ejemplo:
method: POST
url: http://localhost:3001/signup
body:
{
    "name": "Nombre",
    "email": "mail@email.com",
    "password": "mypassword",
    "phone": "+56999999"
}
*/
router.post('/signup', signup);

/**
Login
Ejemplo:
method: POST
url: http://localhost:3001/signin
body:
{
    "email": "mail@email.com",
    "password": "mypassword"
}
*/
router.post('/signin', signin);

module.exports = router;