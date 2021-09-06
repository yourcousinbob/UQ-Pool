const pool = require('./dbPool');


const getTravelTime = async (origin, destination) => {
    const key = process.env.GOOGLE_MAPS_API_KEY
    return fetch('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&region=au&origins='+origin+'&destinations='+destination+'&key='+key)
    .then(response => {response.json()})
    .then(data => {parseInt(data.rows[0].elements[0].duration.text)});
};


module.exports = {
    getTravelTime,
    //Update navigation NOT IMPLEMENTED
    update(user, result) {
        var json = {};
        pool.getConnection(function(err, con) {
            con.query("SELECT user FROM user;", (err,rows) => {
                if(err) throw err;
                json.msg = "updated";
                result(json);
                con.end((err) => {
                });
            });
        });
    },
      
      
      
}
