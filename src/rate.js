const pool = require('./dbPool')

module.exports = {

    driver(body, result) {
        
        var json = {};
        pool.getConnection(function(err, con) {
    con.query("SELECT driver_id FROM rating WHERE driver_id='"+body.driver_id+"';", (err,rows) => {
      if(err) throw err;
    if (rows.length == 0){
    console.log("Driver does not exist "+body.driver_id);
    json.error = 5;
    json.msg = "Driver does not exist";
     result(json);
    }else{
    const rating = { driver_id: body.driver_id, driver_rating: body.driver_rating};
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
      }
      
}
