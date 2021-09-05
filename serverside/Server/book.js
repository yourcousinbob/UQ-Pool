const pool = require('./dbPool')
const navigation = require('./navigation')


module.exports = {

    //Search for a driver
    // body requires: 
    // rider_id, 
    // location, 
    // destination,
    requestPickup(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            if(err) {
                console.log("Could not connect to server")
                throw err;
            }
            con.query("SELECT driver_id, registration, location, destination FROM activeDriver;", (err,rows) => {
                if(err) {
                    console.log("Could not pass query")
                    throw err;
                }
                if (rows.length < 1) { //Might have to do a proximtiy check
                    console.log("No available drivers");
                } else {
                    driver_heuristics = [];
                    //Distance calc assuming all entries sound might
                    //be better way to do async tried lots fix if u can.
                    async function getDetour (driver_heuristics, rows) {
                        for (let i = 0; i < rows.length; i++) {
                            driverETA = await navigation.getTravelTime(rows[i].location, rows[i].destination);
                            pickupETA = await navigation.getTravelTime(rows[i].location, body.location);
                            detourETA = await navigation.getTravelTime(body.location, body.destination) 
                            heuristic = pickupETA + detourETA - driverETA;
                            driver_heuristics.push([rows[i].registration, heuristic])
                        }
                        driver_heuristics.sort((first, second) => {
                            return first[1] - second[1];
                        });
                    };
                    console.log("Successfully parsed drivers");
                    getDetour(driver_heuristics, rows).then(result => {console.log("Potential drivers for " + body.sid + driver_heuristics);});
                    result(driver_heuristics)
                };
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
