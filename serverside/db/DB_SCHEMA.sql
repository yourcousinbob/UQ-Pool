DROP TABLE user;
DROP TABLE activeDriver;
DROP TABLE destination;
DROP TABLE history;
DROP TABLE rating;
DROP TABLE route;
DROP TABLE vehicles;

CREATE TABLE user (
sid varchar(8) NOT NULL UNIQUE,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
email varchar(100) NOT NULL,
phone INTEGER(10),
bio TEXT,
image TEXT,
tokens INTEGER,
PRIMARY KEY (sid));

CREATE TABLE destination (
location_id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
sid varchar(8) NOT NULL,
location varchar(100) NOT NULL,
PRIMARY KEY (location_id),
FOREIGN KEY (sid) REFERENCES user(sid) ON DELETE CASCADE);

CREATE TABLE activeDriver (
driver_id varchar(8) NOT NULL UNIQUE,
destination varchar(100) NOT NULL,
location varchar(100) NOT NULL,
registration varchar(10) NOT NULL,
capacity INTEGER NOT NULL,
PRIMARY KEY (driver_id),
FOREIGN KEY (driver_id) REFERENCES user(sid) ON DELETE CASCADE,
FOREIGN KEY (destination) REFERENCES destination(location) ON DELETE CASCADE);

CREATE TABLE rating (
sid varchar(8) NOT NULL,
rating INTEGER NOT NULL,
FOREIGN KEY (sid) REFERENCES user(sid) ON DELETE CASCADE);

CREATE TABLE route (
route_id INTEGER NOT NULL AUTO_INCREMENT,
driver_id varchar(8) NOT NULL,
rider_id varchar(8) NOT NULL,
route_order INTEGER NOT NULL,
heuristic INTEGER,
start_time DATE,
pickup_time DATE,
arrive_time DATE,
PRIMARY KEY (route_id),
FOREIGN KEY (driver_id) REFERENCES user(sid) ON DELETE CASCADE,
FOREIGN KEY (rider_id) REFERENCES user(sid) ON DELETE CASCADE);

CREATE TABLE vehicles (
registration varchar(10) NOT NULL UNIQUE,
driver_id varchar(8) NOT NULL,
capacity INTEGER NOT NULL,
PRIMARY KEY (registration),
FOREIGN KEY (driver_id) REFERENCES user(sid) ON DELETE CASCADE);

CREATE TABLE history (
time_stamp DATE NOT NULL UNIQUE,
route_id INTEGER NOT NULL,
message TEXT NOT NULL,
PRIMARY KEY (time_stamp),
FOREIGN KEY (route_id) REFERENCES route(route_id) ON DELETE CASCADE);

INSERT INTO user (sid, first_name, last_name, email, phone, bio, image, tokens) VALUES(
43211157,
"Dirk",
"Diggler",
"ddaddy@student.uq.edu.au",
0444777111,
"I like pancakes and syrup on sunday mornings",
"https://www.someDomain.com/images/photo.jpg",
0
);
INSERT INTO rating (sid, rating) VALUES(
43211157,
5
);
INSERT INTO activeDriver (driver_id, destination, location, registration, capacity) VALUES(
43211157,
"The University of Queensland",
"Dreamworld",
"BIGD",
3
);
INSERT INTO route (driver_id, destination, location, registration, capacity) VALUES(
43211157,
"The University of Queensland",
"Dreamworld",
"BIGD",
3
);

CREATE TABLE route (
route_id INTEGER NOT NULL AUTO_INCREMENT,
driver_id varchar(8) NOT NULL,
rider_id varchar(8) NOT NULL,
route_order INTEGER NOT NULL,
heuristic INTEGER,
start_time DATE,
pickup_time DATE,
arrive_time DATE,
PRIMARY KEY (route_id),
FOREIGN KEY (driver_id) REFERENCES user(sid) ON DELETE CASCADE,
FOREIGN KEY (rider_id) REFERENCES user(sid) ON DELETE CASCADE);
