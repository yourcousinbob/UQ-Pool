const pool = require('./dbPool')

module.exports = {

    //Get a user rating
    create(body, result) {

        var json = {};
        pool.getConnection(function(err, con) {
            con.query("SELECT sid FROM rating WHERE sid='"+body.sid+"';", (err,rows) => {
                if(err) throw err;
                if (rows.length == 0){
                    console.log("Driver does not exist "+body.sid);
                    json.error = 5;
                    json.msg = "Driver does not exist";
                    result(json);
                } else {
                    const rating = { sid: body.sid, rating: body.rating};
                    con.query('INSERT INTO rating SET ?', rating, (err, response) => {
                        if(err) throw err;
                        json.msg = "Rating successfully created";
                        result(json);
                    });
                    con.release((err) => {
                    });
                }
            });
        });
    },
      
    remove(user, result) {

        var json = {};
        pool.getConnection(function(err, con) {
            con.query("DELETE FROM rating WHERE sid='"+user+"';", (err, row) => {
                if(err) throw err;
                json.msg = "rating successfully deleted";
                result(json);
                con.release((err) => {
                });
            });
        });
    }
}
