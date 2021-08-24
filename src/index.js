
// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const port = 7777;

// define express
const app = express();
// Enhance API security
app.use(helmet());
// convert incoming request body to json
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan('combined'));

// end point requires
const user = require('./user');
const navigation = require('./navigation');
const book = require('./book');
const review = require('./review');
const reward = require('./reward');

/* request section:
These should reflect the state machine's side effects for
login/registration
booking
navigation
scheduling
rating/review
rewards
*/

// registration section

app.post('/user', async(req, res) => {
    let payload = await user.create(req.body);
    res.send(payload);
});

app.put('/user', async(req, res) => {
    let payload = await user.update(req.body);
    res.send(payload);
});

app.delete('/user', async(req, res) => {
    let payload = await user.delete(req.body.user);
    res.send(payload);
});

    app.get('/users', async(req, res) => {
        let payload = await user.users(req.body);
        res.send(payload);
    });

        app.get('/history', async(req, res) => {
            let payload = await user.history(req.body.user);
            res.send(payload);
        });

/* booking section:
*/

app.post('/requestPool', async(req, res) => {
    // await book.
});

app.post('/cancelRequest', async(req, res) => {
    // await book.
});

app.post('/acceptPool', async(req, res) => {
    // await book.
});

app.post('/rejectPool', async(req, res) => {
    // await book.
});

/* Review section 
*/

app.post('/reviewDriver', async(req, res) => {
    // await review.
});

const server = app.listen(port, (err) => {
  if (err) {
      return console.log('Error: ', err);
  }
  console.log(`server is listening on ${port}`);
})

// webhook section
const io = require('socket.io')(server);

/* Webhook section
These are a reflection of the user/location/booking/review methods but for 
webhooks requiring persistent connections
*/

io.on('connection', (socket) => {
  console.log('a user connected');

// User section
  // Broadcasting user has logged in or out
  // New user location to be added to the table
  
  socket.on('login', async (body) => {

});

  socket.on('logout', (body) => {
      
  });

// Navigation and location management

  socket.on('location', (body) => {
      let payload = navigation.update(body);
      io.emit('location', payload);
        socket.broadcast.emit('location', body);
    });
  
});
