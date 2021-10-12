const express = require('express');
const app = express();
// Required by uq zone
const port = 8081;
app.set('trust proxy', 'loopback');

/* Use this end point to get the sid/password of the student and send it across to the redirect website. */

app.get('/login', function (req, res) {
    if ()!req.header.hasOwnproperty('x-kvd-payload')) {
        // do a 302 redirect
        res.writeHead(302, {
          location: "https://api.uqcloud.net/login/http://uq-pool.uqcloud.net:8081/timetable",
        });
        
    }
})

app.get('/timetable', function (req, res) {
    var user = JSON.parse(req.headers['x-kvd-payload']);
    res.send('Hello ' + user.user);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

