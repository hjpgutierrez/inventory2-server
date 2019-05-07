const express = require('express');
const router = express.Router();

var Proveedores = require('../models/proveedores');

var mdAutenticacion = require('../middlewares/autenticacion');


// cargarProveedores

router.get('/', mdAutenticacion.verificaToken, (req, res) => {

    var proveedores = new Proveedores();

    proveedores.cargarProveedores()

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


router.post('/alta_proveedor', mdAutenticacion.verificaToken, (req, res) => {

    const { nombre, nit, direccion, telefono, email, contacto } = req.body;
    let codusuario = req.usuario.cod;

    var proveedor = new Proveedores();

    proveedor.altaProveedor(nombre, nit, direccion, telefono, email, contacto, codusuario)
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