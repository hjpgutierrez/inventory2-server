module.exports = class Ubicaciones {
    constructor() {

    }


    cargarUbicaciones() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "SELECT *,(SELECT nombre FROM inv_almacen WHERE cod=u.`codalmacen`)'nombrealmacen' FROM inv_ubicacion u;";

            var query_var = [];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    insertarUbicacion(codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_alta) {
        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "INSERT INTO inv_ubicacion (codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_alta,fecha_alta) values (?,?,?,?,?,?,?,?,NOW());";

            var query_var = [codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_alta];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);

            });
        });
    }

    actualizarUbicacion(codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_mod, cod) {
        return new Promise(function(resolve, reject) {

            var connection = require("./database");

            var query_str = "UPDATE inv_ubicacion SET codalmacen = ?, codigo = ?, nombre = ?, zona = ?, pasillo = ?, estanteria = ?, leja = ?, cod_user_mod = ?, fecha_mod = NOW() WHERE cod = ?;";

            var query_var = [codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_mod, cod];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);
            });
        });
    }

    borrarUbicacion(cod) {
        return new Promise(function(resolve, reject) {

            var connection = require("./database");

            var query_str = "DELETE FROM inv_ubicacion WHERE cod = ?;";

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