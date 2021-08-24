
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

// Login/registration section

app.post('/createUser', async(req, res) => {
    
    // await user.
    
});

app.post('/logUser', async(req, res) => {
    
    // await user.
    
});

app.post('/logoutUser', async(req, res) => {
    
    // await user.
    
});

app.get('/getAllUsers', async(req, res) => {
    
    // await user.
    
});

/* Navigation section
Actions related to updating the dynamic userLocation table
*/

app.post('/userLocation', async(req, res) => {
    
    // await navigation.
    
});

app.get('/userLocation', async(req, res) => {
    
    // await navigation.
    
});

app.get('/userLocations', async(req, res) => {
    
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

app.listen(port, (err) => {
  if (err) {
      return console.log('Error: ', err);
  }
  console.log(`server is listening on ${port}`);
})
