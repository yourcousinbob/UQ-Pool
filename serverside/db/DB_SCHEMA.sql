DROP TABLE activeDriver;
DROP TABLE destination;
DROP TABLE history;
DROP TABLE rating;
DROP TABLE route;
DROP TABLE vehicles;
DROP TABLE user;
DROP TABLE rewards;
DROP TABLE userRewards;

CREATE TABLE user (
sid varchar(8) NOT NULL UNIQUE,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
email varchar(100) NOT NULL,
password varchar(256) NOT NULL,
auth_token varchar(60),
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
FOREIGN KEY (driver_id) REFERENCES user(sid) ON DELETE CASCADE);

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

CREATE TABLE rewards (
reward_id varchar(10) NOT NULL UNIQUE,
cost varchar(10),
description varchar(100),
image varchar(100));

CREATE TABLE userRewards (
sid varchar(8) NOT NULL,
reward_id varchar(10) NOT NULL,
quantity varchar(10),
FOREIGN KEY (sid) REFERENCES rewards(reward_id) ON DELETE CASCADE,
FOREIGN KEY (sid) REFERENCES user(sid) ON DELETE CASCADE);


INSERT INTO user (sid, first_name, last_name, email, password, auth_token, phone, bio, image, tokens) VALUES(
43211157,
"Dirk",
"Diggler",
"ddaddy@student.uq.edu.au",
"deece",
123123123,
0444777111,
"I like pancakes and syrup on sunday mornings",
"https://www.someDomain.com/images/photo.jpg",
0
);
INSERT INTO user (sid, first_name, last_name, email, password, auth_token, phone, bio, image, tokens) VALUES(
33211157,
"Ben",
"Wieser",
"benny@student.uq.edu.au",
"deece",
12312312,
0444797111,
"I like ben",
"https://www.ben.com/images/photo.jpg",
0
);
INSERT INTO user (sid, first_name, last_name, email, password, auth_token, phone, bio, image, tokens) VALUES(
43211154,
"Deece",
"Figma",
"email@student.uq.edu.au",
"doze",
12312312,
0433777111,
"I like pans",
"https://www.someDomain.com/images/photo2.jpg",
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
INSERT INTO activeDriver (driver_id, destination, location, registration, capacity) VALUES(
43211154,
"Gallery of Modern Art Brisbane",
"The University of Queensland",
"KINO",
2
);
INSERT INTO activeDriver (driver_id, destination, location, registration, capacity) VALUES(
33211157,
"Dreamworld",
"The University of Queensland",
"BEN",
4
);

-- James' Test Profile + test data
INSERT INTO user (sid, first_name, last_name, email, password, auth_token, phone, bio, image, tokens) VALUES(
45299038,
"James",
"Robins",
"jamesrobins@uq.edu.au",
"password",
12312312,
0412443858,
"I like ben",
"https://www.ben.com/images/photo.jpg",
0
);
