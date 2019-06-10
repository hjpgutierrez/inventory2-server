const express = require('express');
const app = express();

// Settings
app.set('port', process.env.PORT || 4000);

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

// Middlewares
app.use(express.json());


// Routes
var loginRoutes = require('./routes/login');
var logRoutes = require('./routes/log');
var roturasRoutes = require('./routes/roturas');
var almacenesRoutes = require('./routes/almacenes');
var proveedoresRoutes = require('./routes/proveedores');


app.use('/login', loginRoutes);
app.use('/log', logRoutes);
app.use('/roturas', roturasRoutes);
app.use('/almacenes', almacenesRoutes);
app.use('/proveedores', proveedoresRoutes);



// Starting the server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);

});