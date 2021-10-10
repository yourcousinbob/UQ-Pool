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
        var points = 0;

        console.log("Points for user " + body.user + " requested");
        pool.getConnection(function(err, con) {
            con.query("SELECT tokens FROM user WHERE sid='" + body.sid + "';", (err, points) => {
            if (err) throw err;
            json.points = points;
            result(json); 
            });
        });
    },
}
