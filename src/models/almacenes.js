module.exports = class Almacenes {
    constructor() {

    }


    cargarAlmacenes() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "SELECT * FROM inv_almacen ORDER BY cod DESC;";

            var query_var = [];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }


    insertarAlmacen(nombre, tipo, codusuario) {
        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "INSERT INTO inv_almacen (nombre,tipo,cod_user_alta,fecha_alta) values (?,?,?,NOW());";

            var query_var = [nombre, tipo, codusuario];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);

            });
        });


    }


    actualizarAlmacen(nombre, tipo, cod, cod_user_mod) {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "UPDATE  inv_almacen SET nombre = ?, tipo = ?, cod_user_mod = ?, fecha_mod = NOW() WHERE cod = ?;";

            var query_var = [nombre, tipo, cod_user_mod, cod];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);

            });
        });

    }


    borrarAlmacen(cod) {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "DELETE FROM inv_almacen WHERE cod = ?;";

            var query_var = [cod];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);

            });
        });

    }

};