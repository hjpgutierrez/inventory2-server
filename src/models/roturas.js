module.exports = class Roturas {

    constructor() {

    }

    cargarTipoRoturas() {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "SELECT * FROM (SELECT rt.`roturas_tipo_id`'id',rt.`roturas_tipo_texto`'tiporotura',COUNT(*)'total' FROM roturas r INNER JOIN `roturas_tipo` rt ON r.`roturas_tipo`=rt.`roturas_tipo_id` GROUP BY r.`roturas_tipo` UNION SELECT *,0 AS total FROM roturas_tipo) AS a GROUP BY a.id ORDER BY a.tiporotura;";

            connection.query(query_str, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    cargarRoturas(idTipoRotura, fechaini, fechafin) {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str =
                "SELECT r.roturas_id,r.roturas_nivel,r.roturas_zona,r.roturas_fecha_alta,r.roturas_situacion FROM roturas r WHERE r.roturas_tipo=? AND DATE(r.`roturas_fecha_alta`) BETWEEN ? AND ? ORDER BY r.`roturas_fecha_alta` DESC;";

            var query_var = [idTipoRotura, fechaini, fechafin];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

}