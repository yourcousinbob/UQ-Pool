
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

app.post('/user', async(req, res) => {
    console.log(req.body.user);
    // await user.
    
    
});

app.post('/login', async(req, res) => {
    
    // await user.
    
});

<<<<<<< Local Changes
<<<<<<< Local Changes
app.post('/logout', async(req, res) => {
=======
app.get('/getAllUsers', async(req, res) => {
>>>>>>> External Changes
=======
app.post('/logoutUser', async(req, res) => {
>>>>>>> External Changes
    
    // await user.
    
});

<<<<<<< Local Changes
<<<<<<< Local Changes
app.get('/users', async(req, res) => {
=======
app.get('/getUserHistory', async(req, res) => {
>>>>>>> External Changes
=======
app.get('/getAllUsers', async(req, res) => {
>>>>>>> External Changes
    
    // await user.
    
});

/* Navigation section
Actions related to updating the dynamic userLocation table
*/

<<<<<<< Local Changes
<<<<<<< Local Changes
app.post('/location', async(req, res) => {
=======
app.post('/updateUserLocation', async(req, res) => {
>>>>>>> External Changes
=======
app.post('/userLocation', async(req, res) => {
>>>>>>> External Changes
    
    // await navigation.
    
});

<<<<<<< Local Changes
<<<<<<< Local Changes
app.get('/location', async(req, res) => {
=======
app.post('/getUserLocation', async(req, res) => {
>>>>>>> External Changes
=======
app.get('/userLocation', async(req, res) => {
>>>>>>> External Changes
    
    // await navigation.
    
});

<<<<<<< Local Changes
<<<<<<< Local Changes
app.get('/locations', async(req, res) => {
=======
app.post('/getAllLocations', async(req, res) => {
>>>>>>> External Changes
=======
app.get('/userLocations', async(req, res) => {
>>>>>>> External Changes
    
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
