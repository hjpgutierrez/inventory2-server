module.exports = class Proveedores {
    constructor() {

    }


    cargarProveedores() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "SELECT nombre,nit,direccion,telefono,contacto,cod_user_alta,fecha_alta FROM inv_proveedor ORDER BY cod ASC;";

            var query_var = [];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    altaProveedor(nombre, nit, direccion, telefono, email, contacto, codusuario) {
        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "INSERT INTO inv_proveedor (nombre,nit,direccion,telefono,email,contacto,cod_user_alta,fecha_alta) values (?,?,?,?,?,?,?,NOW());";

            var query_var = [nombre, nit, direccion, telefono, email, contacto, codusuario];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });


    }




};