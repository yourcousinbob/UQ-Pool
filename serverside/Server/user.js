const pool = require('./dbPool');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const env = require('dotenv').config({path:'../../.env'});

const getHashedPassword = (password) => {
    const sha256 = crypto.createHash('sha256');
    const hash = sha256.update(password).digest('base64');
    return hash;
}

function generateAuthenticationToken (sid) {
	return jwt.sign({sid: sid}, process.env.TOKEN_SECRET, {expiresIn: process.env.JWT_EXPIRE});
}


module.exports = {

    //Log in user
    login(body, result) {
        var json = {};
        console.log("Attemped Log in for: " + body.sid);
            pool.getConnection(function(err, con) {
                con.query("SELECT sid FROM user WHERE sid='"  + body.sid + "' AND password = '" + getHashedPassword(body.password) + "';", (err, rows) => {
                if (err) throw err;
                if (rows.length == 0){
                    console.log("Invalid Student ID or password for: " + body.sid);
                    json.error = 6;
                    result({ msg:"Invalid Student ID or password"});
                } else {
                    // Log in user and send user details to app
                    console.log("Successful login for " + body.sid);
                    con.query("SELECT sid, phone, first_name, last_name, email, image, tokens FROM user where sid='" + body.sid +"';" , (err, rows) => {
                        if (err) throw err;
                        const authToken = generateAuthenticationToken(body.sid);
                        console.log("Auth token generated");
                        json.first_name = rows[0].first_name;
                        json.last_name = rows[0].last_name;
                        json.email = rows[0].email;
                        json.phone = rows[0].phone;
                        json.sid = rows[0].sid;
                        json.auth_token = authToken;
                        json.tokens = rows[0].tokens,
                        json.msg = "Successful Login";
                        result(json);
                    });
                }
            });
        });
    },

    //Creates User
    create(body, result) {
        var json = {};
        console.log("Attempted User Creation for: " + body.sid);
        pool.getConnection(function(err, con) {
            con.query("SELECT sid FROM user WHERE sid='"+ body.sid +"';", (err,rows) => {
                if(err) throw err;
                if (rows.length > 0){
                    console.log("User already exists with "+body.sid);
                    json.error = 4;
                    json.msg = "user already exists";
                    result(json);
                } else {
                    const user = { sid: body.sid, first_name: body.first_name, last_name: body.last_name, email: body.email, phone: body.phone, tokens: 0, password:getHashedPassword(body.password)};
                    con.query('INSERT INTO user SET ?', user, (err, response) => {
                        if(err) throw err;
                        console.log("User created with sid: " + body.sid);
                        json.msg = "User Succesfully Created";
                        result(json);
                    });
                        con.release((err) => {
                    });
                }
            });
        });
    },

    //Update Existing User
    update(body, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            con.query("SELECT first_name FROM user WHERE sid='"+body.sid+"';", (err,rows) => {
                if(err) throw err;
                if (rows.length == 0){
                    console.log("user doesn't exist");
                    json.error = 5;
                    json.msg = "user does not exist";
                    result(json);
                } else {
                    var user = {};
                    for (var key in body) {
                        user[key] = body[key];
                    }
                    con.query('UPDATE user SET ? WHERE sid='+JSON.stringify(body.sid), user, (err, response) => {
                        if(err) throw err;
                        json.msg = "user successfully updated";
                        result(json);
                    });
                    con.release((err) => {
                    });
                }
            });
        });
    },

    //Gets user details for a given sid
    getUser(body, result) {
        var json = {};
        console.log("Attemped Log in for: " + body.sid);
        pool.getConnection(function(err, con) {
            con.query("SELECT sid, first_name, last_name, image FROM user where sid='" + body.sid + "';" , (err, rows) => {
                if (err) throw err;
                json.first_name = rows[0].first_name;
                json.last_name = rows[0].last_name;
                json.sid = rows[0].sid;
                json.image = rows[0].image;
                result(json);
            });
        });
        
    },

    //Registers a user to be a driver
    driver(body, result) {
        var json = {};
        const driver = {driver_id: body.sid, registration: body.registration, capacity: body.capacity};
        pool.getConnection(function(err, con) {
            con.query('INSERT INTO vehicles SET ?', driver, (err, response) => {
                if(err) throw err;
                console.log("Driver added with sid: " + body.sid);
                json.msg = "Driver Succesfully Added";
                result(json);
            });
                con.release((err) => {
            });
        })
    },

    //Deletes User
    remove(user, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            con.query("DELETE FROM user WHERE sid='"+user+"';", (err, row) => {
                if(err) throw err;
                json.msg = "user successfully deleted";
                result(json);
                con.release((err) => {
                });
            });
        });
    },

    //Returns all users and ratings
    users(body, result) {
        var json = {};
        var users = [];
        pool.getConnection(function(err, con) {
            con.query("SELECT u.sid, u.first_name, u.last_name, u.phone, AVG(r.driver_rating) as avg_rating FROM (SELECT sid, first_name, last_name, phone from user) as u, rating as r WHERE u.sid = r.driver_id GROUP BY u.sid;", (err,rows) => {
                if(err) throw err;
                for (var i = 0; i < rows.length; i++){
                    users.push({sid: rows[i].sid, first_name: rows[i].first_name, last_name: rows[i].last_name, phone: rows[i].phone, rating: rows[i].avg_rating});
                }
                json.users = users;
                result(json);
                con.release((err) => {
                });
            });
        });
    },

    //Returns route history of a user
    history(user, result) {
        var json = {};
        var users = [];
        pool.getConnection(function(err, con) {
            con.query("SELECT route_id, driver_id, rider_id FROM route WHERE driver_id='"+user.sid+"' OR rider_id='"+user.sid+"';", (err,rows) => {
                if(err) throw err;
                for (var i = 0; i < rows.length; i++){
                    users.push(rows[i].user)
                }
                json.users = users;
                result(json);
                con.release((err) => {
                });
            });
        });
    }
            
}

