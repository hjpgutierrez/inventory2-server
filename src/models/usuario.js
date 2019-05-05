module.exports = class Usuario {

    constructor() {

    }

    buscarUsuario(usuario, password) {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "SELECT u.*,up.`nombre`'perfil' " +
                "FROM usu_usuario u " +
                "INNER JOIN `usu_usuarioperfil` up ON u.`codusuarioperfil`=up.`cod` " +
                "WHERE (usuario = ?) AND (pass = ?) " +
                "LIMIT 1 ";

            var query_var = [usuario, password];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

}