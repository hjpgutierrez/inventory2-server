var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;


// ==========================================
//  Verificar token
// ==========================================
exports.verificaToken = function(req, res, next) {

    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
}



// ==========================================
//  Verificar Si es un usuario administrador
// ==========================================
exports.verificaADMIN_ROLE = function(req, res, next) {

    var usuario = req.usuario;

    if (usuario.role === '1') { // Si el codtipousuario es 1 es un administrador
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto',
            errors: { message: 'No es administrador, no tienes accesos a esta función.' }
        });
    }

}