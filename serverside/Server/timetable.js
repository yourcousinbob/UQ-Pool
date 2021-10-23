const pool = require('./dbPool');

function filterTimetable(json) {
    var output = {};
    var events = [json.events[0]];
    const ref = json.events[0].name;
    for (var event in json.events) {
        if (event.name != ref) {
            events.push(event);
        } else {
            break;
        }
    }
    return output;
}

module.exports = {

    //Add time table for sid
    addTimetable(body, result) {
        const events = filterTimetable(body);
        console.log("parsing time table for: ");
            pool.getConnection(function(err, con) {
                for (var event in events) {
                con.query("INSERT INTO timetable(sid, location, start, end) VALUES("+event.location+", "+event.start+", "+event.end+");", (err) => {
                if (err) throw err;
            });
        }
        var json = {};
        json.message = 'successfully added time table entries';
        result(json);
        });
    }

};

