const express = require('express');
const router = express.Router();

var Almacenes = require('../models/almacenes');

var mdAutenticacion = require('../middlewares/autenticacion');


// cargarAlmacen ok

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

// Inserta bien el dato, pero entra en el else status(200) y da ok:false y mensaje: 'no se encontraron registros'
// Imagino que hay que mejorar el if(dato) algo he echo mal.

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


router.post('/modificar_almacen', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, tipo, cod } = req.body;
    let cod_user_mod = req.usuario.cod;

    var almacenes = new Almacenes();

    almacenes.modificarAlmacen(nombre, tipo, cod, cod_user_mod)

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