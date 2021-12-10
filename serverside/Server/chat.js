const pool = require('./dbPool')

module.exports = {

    // After a pool recieves a message
    // It is stored in the DB
    // The payload to each pool member is also generated
    // To be sent out to users
    sendMessage(body, result) {
        //Insert db code here
        
        var json = {};
        console.log("message received to be sent");
        json.msg = body.message;
        result(json);
    }



}