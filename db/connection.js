//mudei para my sql pois não é compativel a versão mais recente
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'contato',
    insecureAuth: true
});

module.exports = connection;