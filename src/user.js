const pool = require('./dbPool')

module.exports = {
    
    create(body, result) {
        var json = {};
    if (body.user.match(/[!@#\$%\|\}\{\]\[]+/g) !== null) {
    console.log("forbidden character in username");
    json.error = 0;
    json.msg = "illegal character";
    result(json]);
    }
    if (body.email.match([a-zA-Z0-9_\-]*@[a-zA-Z].uq.edu.au/g) !== null) {
    console.log("non UQ email");
    json.error = 1;
    json.msg = "not a UQ email";
    result(json]);
    }
        pool.getConnection(function(err, con) {
    con.query("SELECT username FROM user WHERE username='"+body.user+"';", (err,rows) => {
      if(err) throw err;
    if (rows.length > 0){
    console.log("User already exists");
    json.error = 2;
    json.msg = "user already exists";
     result([json);
    }else{
    const user = { user: body.user, password: body.password, email: body.email};
    con.query('INSERT INTO USERS  SET ?', user, (err, response) => {
      if(err) throw err;
      json.msg = "user successfully created";
    result(json);
    });
    con.end((err) => {
    });
    }
    });
    });
      },
      
      update(body, result) {
          var json = {};
          pool.getConnection(function(err, con) {
      con.query("SELECT username FROM user WHERE username='"+body.user+"';", (err,rows) => {
        if(err) throw err;
      if (rows.length == 0){
      console.log("user doesn't exist");
      json.error = 3;
      json.msg = "user does not exist";
       result([json);
      }else{
      const user = { password: body.password, email: body.email};
      con.query('INSERT INTO USERS  SET ?', user, (err, response) => {
        if(err) throw err;
        json.msg = "user successfully updated";
      result(json);
      });
      con.end((err) => {
      });
      }
      });
      });
        },
      
        delete(user, result) {
            var json = {};
            pool.getConnection(function(err, con) {
        con.query("DELETE FROM user WHERE username='"+body.user+"';", (err,rows) => {
          if(err) throw err;
          json.msg = "user successfully deleted";
        result(json);
        con.end((err) => {
        });
        });
    });
          },

          users(, result) {
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
          con.end((err) => {
          });
          });
      });
            }
            
}
