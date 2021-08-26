const sql = require('mysql')

var pool      = sql.createPool({
connectionLimit : 100,
host: 'localhost',
user : 'root',
password : 'WilsonLOVE',
database : 'UQPool',
    multipleStatements: true
});

module.exports = pool;
