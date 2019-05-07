const express = require('express');
const router = express.Router();

var Almacenes = require('../models/almacenes');

var mdAutenticacion = require('../middlewares/autenticacion');

router.get('/', mdAutenticacion.verificaToken, (req, res) => {

    var almacenes = new Almacenes();

    almacenes.cargarAlmacenes()

    .then(function(dato) {

        if (dato && dato.length > 0) {
            console.log(dato);
            return res.status(200).json({
                ok: true,
                resp: dato
            });

        } else {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se encontraron registros'
            });
        }

    }).catch(function(err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno'
        });
    });

});



router.post('/alta_almacen', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, tipo } = req.body;
    let codusuario = req.usuario.cod;

    var almacen = new Almacenes();

    almacen.altaAlmacen(nombre, tipo, codusuario)
        .then(function(dato) {


            if (dato && dato.length > 0) {
                console.log(dato);

                return res.status(200).json({
                    ok: true,
                    resp: dato
                });

            } else {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'No se encontraron registros'
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