
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

/* Navigation section
Actions related to updating the dynamic userLocation table
*/

        app.post('/location', async(req, res) => {
            let payload = await navigation.update(req.body);
            res.send(payload);
              io.broadcast.emit({user: req.body.user, location: req.body.location});
});

app.get('/location', async(req, res) => {
    // await navigation.
    
});

app.get('/locations', async(req, res) => {
    // await navigation.
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
These methods should provide user connectivity, location update broadcast
and disconnection notifications to all users
*/

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

