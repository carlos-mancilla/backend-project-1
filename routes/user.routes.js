const express = require('express');
const router = express.Router();
const {
    getUsers,
    createUser,
    getUserById
} = require('../controller');

router.get('/', getUsers);

router.post('/user', createUser);
router.get('/user/:id', getUserById);

module.exports = router;
