const sql = require('mysql')

var pool      = sql.createPool({
connectionLimit : 100,
host: '127.0.0.1',
user : 'root',
password : 'GeN7NoLoBl@ckJ@ck',
database : 'UQPool',
    multipleStatements: true
});

module.exports = pool;
