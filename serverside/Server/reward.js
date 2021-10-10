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
                rewards.push(rows[i].user)
            }
            json.rewards = rewards;
            result(json); 
            });
        });
    },
}
