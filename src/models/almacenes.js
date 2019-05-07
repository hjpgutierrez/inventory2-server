module.exports = class Almacenes {
    constructor() {

    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    // cargarAlmacenes
    //          cod_user_alta es un numero el id de la tabla usuarios
    //          ¿Si luego se quiere mostrar en el table el nombre de usuario como se saca el nombre?
    //          ¿Se hace en este select?
    ////////////////////////////////////////////////////////////////////////////////////////////////////

    cargarAlmacenes() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "SELECT nombre,tipo,cod_user_alta,fecha_alta FROM inv_almacen ORDER BY cod DESC;";

            var query_var = [];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }


    altaAlmacen(nombre, tipo, codusuario) {
        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "INSERT INTO inv_almacen (nombre,tipo,cod_user_alta,fecha_alta) values (?,?,?,NOW());";

            var query_var = [nombre, tipo, codusuario];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });


    }

    modificarAlmacen() {}

    eliminarAlmacen() {}

};