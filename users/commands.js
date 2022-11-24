const app = require("../expressModule");
// const app = express();
// const keycloak = require("../KeycloacManager");
// const db = require("../databaseModule.js");

// var kc = keycloak.getKeycloak();

// app.get("/users", kc.protect('admin'), async (req, res) => {
//     let rows = await register();
//     res.json(rows);
// });

// function register() {
//     return new Promise((resolve, reject) => {
//         db.query('SELECT * from Users where Id = ?', ['1a'], (err, rows) => {
//             if (err)
//                 return err;
//             resolve(rows);
//         });
//     });
// }

//module.exports = { app, register };