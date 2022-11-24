var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

var keycloakConfig = {
    clientId: 'admin-cli',
    bearerOnly: true,
    serverUrl: 'http://localhost:8084/auth',
    realm: 'webapp',
    credentials: {
        secret: 'jD3VTKB2aTyReI3AMLoUgBAUIfrYwHUB'
    } 
};
 
function initKeycloak() {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        return _keycloak;
    }
}

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
        initKeycloak();
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};