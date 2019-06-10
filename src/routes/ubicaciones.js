const express = require('express');
const router = express.Router();

var Ubicaciones = require('../models/ubicaciones');

var mdAutenticacion = require('../middlewares/autenticacion');


router.get('/', mdAutenticacion.verificaToken, (req, res) => {

    var ubicaciones = new Ubicaciones();

    ubicaciones.cargarUbicaciones()
        .then(function(dato) {

            if (dato && dato.length > 0) {

                let lista = dato.map((fila) => {
                    return {
                        cod: fila.cod,
                        codalmacen: fila.codalmacen,
                        codigo: fila.codigo,
                        nombre: fila.nombre,
                        zona: fila.zona,
                        pasillo: fila.pasillo,
                        estanteria: fila.estanteria,
                        leja: fila.leja,

                        nombrealmacen: fila.nombrealmacen,
                    }
                });

                return res.status(200).json({
                    ok: true,
                    resp: lista
                });

            } else {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'No se encontraron ubicaciones'
                });
            }

        }).catch(function(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno'
            });
        });

});

router.post('/insertarubicacion', mdAutenticacion.verificaToken, (req, res) => {

    const { codalmacen, codigo, nombre, zona, pasillo, estanteria, leja } = req.body;

    let cod_user_alta = req.usuario.cod;

    var ubicaciones = new Ubicaciones();

    ubicaciones.insertarUbicacion(codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_alta)
        .then(function(dato) {

            if (dato > 0) {
                return res.status(200).json({
                    ok: true,
                    resp: dato
                });
            } else {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'No se inserto la ubicacion'
                });
            }

        }).catch(function(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno'
            });
        });
});

router.put('/actualizarubicacion', mdAutenticacion.verificaToken, (req, res) => {

    const { codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod } = req.body;

    let cod_user_mod = req.usuario.cod;

    var ubicaciones = new Ubicaciones();

    ubicaciones.actualizarUbicacion(codalmacen, codigo, nombre, zona, pasillo, estanteria, leja, cod_user_mod, cod)

    .then(function(dato) {

        if (dato > 0) {
            return res.status(200).json({
                ok: true,
                resp: dato
            });

        } else {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se puedo actualizar la ubicacion'
            });
        }

    }).catch(function(err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno'
        });
    });

});

router.delete('/borrarubicacion', mdAutenticacion.verificaToken, (req, res) => {

    const { cod } = req.body;

    var ubicaciones = new Ubicaciones();

    ubicaciones.borrarUbicacion(cod)

    .then(function(dato) {

        if (dato > 0) {

            return res.status(200).json({
                ok: true,
                resp: dato
            });

        } else {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se encontró la ubicación'
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