const express = require('express');
const router = express.Router();

var Almacenes = require('../models/almacenes');

var mdAutenticacion = require('../middlewares/autenticacion');


router.get('/', mdAutenticacion.verificaToken, (req, res) => {

    var almacenes = new Almacenes();

    almacenes.cargarAlmacenes()

    .then(function(dato) {

        if (dato && dato.length > 0) {

            let lista = dato.map((fila) => {
                return {
                    cod: fila.cod,
                    nombre: fila.nombre,
                    tipo: fila.tipo,
                }
            });

            return res.status(200).json({
                ok: true,
                resp: lista
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

router.post('/insertaralmacen', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, tipo } = req.body;
    let codusuario = req.usuario.cod;

    var almacen = new Almacenes();

    almacen.insertarAlmacen(nombre, tipo, codusuario)
        .then(function(dato) {

            if (dato > 0) {
                return res.status(200).json({
                    ok: true,
                    resp: dato
                });
            } else {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'No se inserto el almacen'
                });
            }

        }).catch(function(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno'
            });
        });

});

router.post('/actualizaralmacen', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, tipo, cod } = req.body;
    let cod_user_mod = req.usuario.cod;

    var almacenes = new Almacenes();

    almacenes.actualizarAlmacen(nombre, tipo, cod, cod_user_mod)

    .then(function(dato) {

        if (dato > 0) {
            return res.status(200).json({
                ok: true,
                resp: dato
            });

        } else {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se puedo actualizar el almacen'
            });
        }

    }).catch(function(err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno'
        });
    });

});


router.delete('/borraralmacen', mdAutenticacion.verificaToken, (req, res) => {

    const { cod } = req.body;

    var almacenes = new Almacenes();

    almacenes.borrarAlmacen(cod)

    .then(function(dato) {

        if (dato > 0) {

            return res.status(200).json({
                ok: true,
                resp: dato
            });

        } else {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se encontró el proveedor'
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