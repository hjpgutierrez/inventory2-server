module.exports = class Menu {


    constructor() {

    }

    cargarMenus(codperfil) {

        return new Promise(function(resolve, reject) {
            var connection = require('./database');

            var query_str = "SELECT m.* FROM usu_menu m INNER JOIN `usu_menuperfil` mp ON m.cod=mp.`codmenu` WHERE mp.`codperfil`=? ORDER BY m.orden";

            var query_var = [codperfil];

            connection.query(query_str, query_var, function(err, rows) {

                if (err) {
                    return reject(err);
                }

                resolve(rows);
            });
        });
    }

    organizarMenus(datosMenus) {

        let listaOrganizada = new Array();

        // Primero filtramos los menus que son nivel 1
        var _ = require('lodash');
        let menusPrimerNivel = _.filter(datosMenus, { 'nivel': 1 });

        // Listo , ahora reccorremos los menus buscando si tiene submenus

        menusPrimerNivel.forEach(itemMenuNivel1 => {

            let listaSubmenus = new Array();

            let subMenus = _.filter(datosMenus, { 'codmenu': itemMenuNivel1.cod });
            if (subMenus && subMenus.length > 0) {

                subMenus.forEach(itemMenuNivel2 => {
                    listaSubmenus.push({
                        cod: itemMenuNivel2.cod,
                        nombre: itemMenuNivel2.nombre,
                        link: itemMenuNivel2.link
                    });
                });

            }

            let ItemMenu = {
                cod: itemMenuNivel1.cod,
                nombre: itemMenuNivel1.nombre,
                link: itemMenuNivel1.link,
                submenus: listaSubmenus
            };

            listaOrganizada.push(ItemMenu);
        }); // Fin del Foreach menus

        return listaOrganizada;
    }

}