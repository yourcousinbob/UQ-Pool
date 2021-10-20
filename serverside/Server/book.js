const pool = require('./dbPool')
const navigation = require('./navigation')


module.exports = {

    //Search for a driver
    // body requires: 
    // rider_id, 
    // location, 
    // destination,
    // I dont want to touch this ever again if you want to attempt to fix it go
    // ahead at risk of your own sanity.
    async requestPickup(body, result) {
        var json = {};
        pool.getConnection(async function(err, con) {
            if(err) {
                console.log("Could not connect to server")
                throw err;
            }
            con.query("SELECT driver_id, registration, location, destination FROM activeDriver;", async (err,rows) => {
                if(err) {
                    console.log("Could not pass query")
                    json.msg = "Could not pass query";
                    result(json)
                    throw err;
                }
                if (rows.length < 1) {
                    console.log("No available drivers");
                } else {
                    let promises = [];

                    for (const row of rows) {
                        promises.push(new Promise(async (res, rej) => {
                            let driverETA = await navigation.getTravelTime(row.location, row.destination);
                            let pickupETA = await navigation.getTravelTime(row.location, body.location);
                            let dropoffETA = await navigation.getTravelTime(body.location, body.destination) 
                            let detourETA = await navigation.getTravelTime(body.destination, row.destination) 
                            const heuristic = pickupETA + dropoffETA + detourETA - driverETA;
                            let queryInfo = new Promise(async (resolve, reject) => {
                                con.query("select first_name, last_name, image, location, destination from user where sid='"+row.driver_id+"';", async (err, info) => {
                                    if(err) {
                                        console.log("Could not pass query")
                                        json.msg = "Could not pass query";
                                        reject(json)
                                        throw err;
                                    }
                                    resolve(info)
                                })})
                            let info = await queryInfo
                            const driver = {
                                driver_id: row.driver_id, 
                                registration: row.registration, 
                                heuristic: heuristic,
                                first_name: info[0].first_name, 
                                last_name: info[0].last_name,
                                image: info[0].image,
                                location: info[0].location,
                                destination: info[0].destination
                            }
                            res(driver)
                        })
                        )}
                        let drivers = await Promise.all(promises)
                        drivers.sort((first, second) => {
                            return first.heuristic - second.heuristic;
                        })
                        console.log(drivers)
                        result(drivers);
                        console.log("Successfully parsed drivers for " + body.sid);
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
            const driver = { driver_id: body.sid, location: body.location, destination: body.destination, registration: body.registration, capacity: body.capacity };
            con.query('INSERT INTO activeDriver SET ?', driver, (err, response) => {
                if(err) throw err;
                console.log("Active driver created with sid: " + body.sid);
                json.msg = "Driver Succesfully Added";
                result(json);
            });
        });
    },

    // Removes a driver from the active driver list
    removeDriver(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            if (err) throw err;
            con.query("DELETE FROM activeDriver WHERE driver_id='" + body.sid + "';", (err, row) => {
                if(err) throw err;
                console.log("Active driver removed sid: " + body.sid);
                json.msg = "Driver Succesfully Removed";
                result(json);
            });
        });
    },

    // Make a request to a driver to be picked up
    requestDriver(body, result) {
      var json = {};
      pool.getConnection(function(err, con) {
        if (err) throw err;
        con.query("")
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
