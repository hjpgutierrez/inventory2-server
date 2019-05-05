const express = require('express');
const router = express.Router();

var LOG = require('../models/log');

// GET all Employees
router.get('/', (req, res) => {

    var log = new LOG();
    log.cargarLog()
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