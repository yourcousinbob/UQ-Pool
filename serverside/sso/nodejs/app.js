const express = require('express');
const app = express();

const port = 8081;

app.set('trust proxy', 'loopback');

app.get('/', function (req, res) {
    // var user = JSON.parse(req.headers['x-kvd-payload']);
    // res.send('Hello ' + user.user);
    // do a 302 redirect
    res.writeHead(302, {
      location: "https://timetable.my.uq.edu.au/odd"
  });
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
