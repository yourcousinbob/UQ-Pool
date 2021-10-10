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
		    console.log("Successful login for " + body.sid);
		    const authToken = generateAuthenticationToken(body.sid);
		    console.log("Auth token generated");
		    result({msg:"Successful Login", auth_token: authToken});
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

