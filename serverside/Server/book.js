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
                if (rows.length < 1) {
                    console.log("No available drivers");
                } else {
                    let driver_heuristics = [];

                    async function getDetour (driver_heuristics, rows) {
                        for (let i = 0; i < rows.length; i++) {
                            driverETA = await navigation.getTravelTime(rows[i].location, rows[i].destination);
                            pickupETA = await navigation.getTravelTime(rows[i].location, body.location);
                            detourETA = await navigation.getTravelTime(body.location, body.destination) 
                            heuristic = pickupETA + detourETA - driverETA;
                            driver_heuristics.push([rows[i].driver_id, rows[i].registration, heuristic])
                            driver_heuristics.sort((first, second) => {
                                return first[2] - second[2];
                            });
                        }
                    }

                    let drivers = []
                    console.log("Successfully parsed drivers for " + body.sid);
                    getDetour(driver_heuristics, rows).then(response => {
                        for (let i = 0; i < driver_heuristics.length; i++){
                            con.query("SELECT first_name, last_name, image FROM user WHERE sid='"+driver_heuristics[i][0]+"';", (err,rows) => {
                                if(err) {
                                    console.log("Could not pass query")
                                    throw err;
                                }
                                drivers.push({
                                    driver_id: driver_heuristics[i][0], 
                                    registration: driver_heuristics[i][1], 
                                    heuristic: driver_heuristics[i][2], 
                                    first_name: rows[0].first_name, 
                                    last_name: rows[0].last_name,
                                    image: rows[0].image
                                })
                            });
                        }
                        result(drivers)
                    });
                };
            });
            con.release((err) => {
            });
        });
    },

    // Adds a new driver to the available driver list
    addDriver(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            if (err) throw err;
            con.query("INSERT INTO activeDRIVER (driver_id, destination, location, registration, capacity) VALUES(" + body.sid + ", '" + body.destination + "', '"
            + body.location + "', '" + body.registration + "'," + body.capacity)
            json.msg = "Driver added to queue"
            result(json)
        });
    },

        

    //Accept a pickup
    //Body requires:
    //driver_id,
    acceptPickup(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            if(err) {
                console.log("Could not connect to server")
                throw err;
            }
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
    //Body requires:
    //route_id, -- might need to change TODO:
    //rider_id,
    cancelPickup(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            if(err) {
                console.log("Could not connect to server")
                throw err;
            }
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
