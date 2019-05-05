const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventory20190424',
    multipleStatements: true
});

mysqlConnection.connect(function(err) {
    if (err) {
        console.error(err);
        return;
    } else {
        // console.log('db is connected');
    }
});

module.exports = mysqlConnection;