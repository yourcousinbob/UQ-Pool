const pool = require('./dbPool')

module.exports = {
    
    create(body, result) {
        
        var json = {};
    if (JSON.stringify(body.sid).match(/[!@#\$%\|\}\{\]\[]+/g) != null) {
    console.log("forbidden character in username");
    json.error = 0;
    json.msg = "illegal character";
    result(json);
    return;
    }
    if (body.email.match(/[a-zA-Z0-9_\-\.]*@[a-zA-Z]*.uq.edu.au/g) == null) {
    console.log("non UQ email");
    json.error = 2;
    json.msg = "not a UQ email";
    result(json);
    return;
    }
    if (JSON.stringify(body.sid).length != 8) {
    console.log("student ID is not 8 digits");
    json.error = 3;
    json.msg = "sid not 8 digits";
    result(json);
    return;
    }
    
        pool.getConnection(function(err, con) {
    con.query("SELECT sid FROM user WHERE sid='"+JSON.stringify(body.sid)+"';", (err,rows) => {
      if(err) throw err;
    if (rows.length > 0){
    console.log("User already exists"+body.sid);
    json.error = 4;
    json.msg = "user already exists";
     result(json);
    }else{
    const user = { sid: JSON.stringify(body.sid), first_name: body.first_name, last_name: body.last_name, email: body.email, phone: body.phone, tokens: 0};
    con.query('INSERT INTO user SET ?', user, (err, response) => {
      if(err) throw err;
      json.msg = "user successfully created";
    result(json);
    });
    con.release((err) => {
    });
    }
    });
});
      },
      
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
      }else{
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
      
        delete(user, result) {
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

          users(result) {
              var json = {};
              var users = [];
              pool.getConnection(function(err, con) {
          con.query("SELECT user FROM user;", (err,rows) => {
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
            },
            
            history(user, result) {
                var json = {};
                var users = [];
                pool.getConnection(function(err, con) {
            con.query("SELECT user FROM user;", (err,rows) => {
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

