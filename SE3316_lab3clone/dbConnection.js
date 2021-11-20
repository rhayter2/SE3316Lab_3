var mysql = require('mysql');
function newConnection()
{
    let conn = mysql.createConnection({
        host: '34.68.54.173',
        user:'root',
        password:'3316password',
        database: 'L3DB'
    });
    return conn;

}
module.exports = newConnection;