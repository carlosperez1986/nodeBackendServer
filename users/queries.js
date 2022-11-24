const db = require("../databaseModule.js");

function getUsers() {
    return new Promise((resolve, reject) => {
        db.query('SELECT * from Users where Id = ?', ['1a'], (err, rows) => {
            if (err)
                return err;
            resolve(rows);
        });
    });
}

module.exports = { getUsers };