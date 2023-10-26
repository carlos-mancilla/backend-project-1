const {
    getUsers,
    getUserById
} = require('./user.controller');
const {
    signup,
    signin
} = require('./sing.controller');

module.exports = {
    getUsers,
    getUserById,
    signup,
    signin
}