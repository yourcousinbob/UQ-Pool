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
        pool.getConnection(function(err, con) {
            con.query("SELECT sid FROM user WHERE sid='" + body.sid + "';", async (err,rows) => {
                if(err) {
                    console.log("Could not pass query")
                    json.msg = "Could not pass query";
                    result(json)
                    throw err;
                }
                if (rows.length < 1) {
                    result({msg: "not a user"})
                } else {
                    console.log("Points for user " + body.sid + " requested");
                        con.query("SELECT tokens FROM user WHERE sid='" + body.sid + "';", (err, row) => {
                        if (err) throw err;
                        json.points = row.tokens;
                        result(json); 
                    });
                }
            });
        });
    },

    //Adds points to a user
    addPoints(body, result) {
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

    //Redeems points for a prize
    redeemPoints(body, result) {
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
