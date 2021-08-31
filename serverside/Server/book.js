const pool = require('./dbPool')

module.exports = {

    //Search for a driver
    requestPickup(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            con.query("SELECT sid FROM route WHERE rider_id='"+JSON.stringify(body.sid)+"' AND pickup_time IS NULL;", (err,rows) => {
                if(err) throw err;
                if (rows.length > 0){
                    console.log("User already booked"+body.sid);
                    json.error = 4;
                    json.msg = "user already booked";
                    result(json);
                } else {
                    //con.query("SELECT driver_id, location_lat, location_long, destination FROM route WHERE rider_id='"+JSON.stringify(body.sid)+"' AND pickup_time IS NULL;", (err,rows) => {
                        // Insert heuristic algorithm return driverid:heuristic
                    //)};
                }
            });
            con.release((err) => {
            });
        });
    },

    //Accept a pickup
    acceptPickup(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            con.query("SELECT capacity FROM activeDriver WHERE driver_id='"+JSON.stringify(body.driver_id)+"';", (err,rows) => {
                if(err) throw err;
                if (rows.capacity == 0) {
                    con.query("DELETE FROM activeDriver WHERE driver_id='"+body.driver_id+"';", (err, rows) => {
                        if(err) throw err;
                        console.log("Driver at max capacity removing from activeDrivers");
                    });
                } else {
                    con.query('UPDATE activeDriver SET ? WHERE sid='+JSON.stringify(body.driver_id), rows.capacity - 1, (err, response) => {
                        if(err) throw err;
                        console.log("Driver capacity reduced");
                    });
                }
            }),
            con.query('INSERT INTO route SET ?', body, (err, response) => {
                if(err) throw err;
                console.log("Successfully accepted pickup.");
                json.msg = "successfully accepted pickup.";
                result(json);
                con.release((err) => {
                });
            });
        });
    },

    //Cancel a pickup
    cancelPickup(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            con.query("DELETE FROM route WHERE route_id='"+body.route_id+"' AND rider_id='"+body.rider_id+"';", (err, row) => {
                if(err) throw err;
                json.msg = "pickup successfully cancelled";
                result(json);
                con.release((err) => {
                });
            });
        });
    }
}
