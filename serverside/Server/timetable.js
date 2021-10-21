const pool = require('./dbPool');

function filterTimetable(json) {
    var output = {};
    var events = [json.events[0]];
    const ref = json.events[0].name;
    for event in json.events {
        if event.name != ref {
            events.push(event);
        } else {
            break;
        }
    }
    return output;
}

module.exports = {

    //Add time table for sid
    addTimetable(body, result) {
        var json = {};
        console.log("parsing time table for: " + body.sid);
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
                    con.query("SELECT sid, phone, first_name, last_name, email, image FROM user where sid='" + body.sid +"';" , (err, rows) => {
                        if (err) throw err;
                        const authToken = generateAuthenticationToken(body.sid);
                        console.log("Auth token generated");
                        json.first_name = rows[0].first_name;
                        json.last_name = rows[0].last_name;
                        json.email = rows[0].email;
                        json.phone = rows[0].phone;
                        json.sid = rows[0].sid;
                        json.auth_token = authToken;
                        json.msg = "Successful Login";
                        result(json);
                    });
                }
            });
        });
    },

    //Gets matching timetables
    match(body, result) {
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
    }

}

