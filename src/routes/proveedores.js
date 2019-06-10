const express = require('express');
const router = express.Router();

var Proveedores = require('../models/proveedores');

var mdAutenticacion = require('../middlewares/autenticacion');


router.get('/', mdAutenticacion.verificaToken, (req, res) => {

    var proveedores = new Proveedores();

    proveedores.cargarProveedores()
        .then(function(dato) {

            if (dato && dato.length > 0) {

                let lista = dato.map((fila) => {
                    return {
                        cod: fila.cod,
                        nombre: fila.nombre,
                        nit: fila.nit,
                        direccion: fila.direccion,
                        telefono: fila.telefono,
                        contacto: fila.contacto,
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

router.post('/insertarproveedor', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, nit, direccion, telefono, email, contacto } = req.body;

    let codusuario = req.usuario.cod;

    var proveedor = new Proveedores();

    proveedor.insertarProveedor(nombre, nit, direccion, telefono, email, contacto, codusuario)
        .then(function(dato) {

            if (dato > 0) {
                return res.status(200).json({
                    ok: true,
                    resp: dato
                });
            } else {
                return res.status(200).json({
                    ok: false,
                    mensaje: 'No se inserto el proveedor'
                });
            }

        }).catch(function(err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error interno'
            });
        });
});


router.put('/actualizarproveedor', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, nit, direccion, telefono, email, contacto, cod } = req.body;

    let codusermod = req.usuario.cod;

    var proveedor = new Proveedores();

    proveedor.actualizarProveedor(nombre, nit, direccion, telefono, email, contacto, codusermod, cod)

    .then(function(dato) {

        if (dato > 0) {
            return res.status(200).json({
                ok: true,
                resp: dato
            });

        } else {
            return res.status(200).json({
                ok: false,
                mensaje: 'No se puedo actualizar el proveedor'
            });
        }

    }).catch(function(err) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error interno'
        });
    });

});

router.delete('/borrarproveedor', mdAutenticacion.verificaToken, (req, res) => {

    const { cod } = req.body;

    var proveedor = new Proveedores();

    proveedor.borrarProveedor(cod)

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