module.exports = class Proveedores {
    constructor() {

    }


    cargarProveedores() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "SELECT * FROM inv_proveedor ORDER BY cod ASC;";

            var query_var = [];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    insertarProveedor(nombre, nit, direccion, telefono, email, contacto, codusuario) {
        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "INSERT INTO inv_proveedor (nombre,nit,direccion,telefono,email,contacto,cod_user_alta,fecha_alta) values (?,?,?,?,?,?,?,NOW());";

            var query_var = [nombre, nit, direccion, telefono, email, contacto, codusuario];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);

            });
        });
    }

    actualizarProveedor(nombre, nit, direccion, telefono, email, contacto, codusermod, cod) {
        return new Promise(function(resolve, reject) {

            var connection = require("./database");

            var query_str = "UPDATE inv_proveedor SET nombre = ?, nit = ?, direccion = ?, telefono = ?, email = ?, contacto = ?, cod_user_mod = ?, fecha_mod = NOW() WHERE cod = ?;";

            var query_var = [nombre, nit, direccion, telefono, email, contacto, codusermod, cod];

            connection.query(query_str, query_var, function(err, results) {

                if (err) {
                    return reject(err);
                }

                resolve(results.affectedRows);
            });
        });
    }

    borrarProveedor(cod) {
        return new Promise(function(resolve, reject) {

            var connection = require("./database");

            var query_str = "DELETE FROM inv_proveedor WHERE cod = ?;";

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