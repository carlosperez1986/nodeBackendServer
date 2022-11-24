const router = require('../expressModule.js');
const keycloak = require("../KeycloacManager");

const queries = require('./queries.js');
// const commands = require('./commands.js');

var kc = keycloak.getKeycloak();

module.exports = function (req, res) {
    res.status(200).render('users1', {
        users: queries.getUsers(),
        loginError: false
    });
};

router.get('/users', kc.protect('admin'), require('users1'));

module.exports = {
    router: router
};
