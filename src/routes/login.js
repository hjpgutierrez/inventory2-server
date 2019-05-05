const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

var Usuario = require('../models/usuario');
var Menu = require('../models/menu');
var SEED = require('../config/config').SEED;

// GET all Employees
router.post('/', (req, res) => {

    const { usuario, pass } = req.body;

    var user = new Usuario();
    user.buscarUsuario(usuario, pass)
        .then(function(dato) {

            if (dato && dato.length > 0) {

                let itemUsuario = dato[0];

                var token = jwt.sign({ usuario: itemUsuario }, SEED, { expiresIn: 14400 }); // 4 horas

                let menu = new Menu();
                menu.cargarMenus(itemUsuario.codusuarioperfil)
                    .then(function(datosMenu) {

                        if (datosMenu && datosMenu.length > 0) {
                            return res.status(200).json({
                                ok: true,
                                usuario: dato,
                                menu: menu.organizarMenus(datosMenu),
                                token: token
                            });
                        } else {
                            return res.status(200).json({
                                ok: true,
                                usuario: dato,
                                menu: [],
                                token: token
                            });
                        }

                    }).catch(function(err) {
                        return res.status(200).json({
                            ok: true,
                            usuario: dato,
                            menu: [],
                            token: token
                        });
                    });

            } else {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'Usuario no encontrado'
                });
            }

        }).catch(function(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno'
            });
        });

});

module.exports = router;