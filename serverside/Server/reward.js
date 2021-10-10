const pool = require('./dbPool')

module.exports = {

    //Gets all rewards possible
    getRewards(body, result) {
        var json = {};
        var rewards = [];

        console.log("Rewards list requested");
        pool.getConnection(function(err, con) {
            con.query("SELECT * FROM rewards;", (err, rows) => {
            if (err) throw err;
            for (var i = 0; i < rows.length; i++){
                rewards.push(rows[i])
            }
            json.rewards = rewards;
            result(json); 
            });
        });
    },

    //Gets points of a user
    getPoints(body, result) {
        var json = {};

        console.log("Points for user " + body.sid + " requested");
        pool.getConnection(function(err, con) {
            con.query("SELECT tokens FROM user WHERE sid='" + body.sid + "';", (err, row) => {
            if (err) throw err;
            json.points = row.tokens;
            result(json); 
            });
        });
    },
}
