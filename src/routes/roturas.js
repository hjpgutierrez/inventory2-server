const express = require('express');
const router = express.Router();

var Roturas = require('../models/roturas');

var mdAutenticacion = require('../middlewares/autenticacion');

router.get('/tipos', mdAutenticacion.verificaToken, (req, res) => {

    var roturas = new Roturas();
    roturas.cargarTipoRoturas()
        .then(function(dato) {

            if (dato && dato.length > 0) {

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

router.get('/roturas/:idTipoRotura/:fechaini/:fechafin', (req, res) => {

    var roturas = new Roturas();

    let idTipoRotura = req.params.idTipoRotura;
    let fechaini = req.params.fechaini;
    let fechafin = req.params.fechafin;

    console.log(idTipoRotura + " " + fechaini + " " + fechafin);

    roturas.cargarRoturas(idTipoRotura, fechaini, fechafin)
        .then(function(dato) {

            if (dato && dato.length > 0) {

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