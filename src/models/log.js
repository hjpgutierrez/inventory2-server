module.exports = class LOG {

    constructor() {

    }

    cargarLog() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "SELECT * FROM `sc_log` ORDER BY id DESC;";

            connection.query(query_str, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

}