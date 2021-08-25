ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'GeN7NoLoBl@ckJ@ck';
DROP TABLE activeDriver;
DROP TABLE activeRider;
DROP TABLE destination;
DROP TABLE history;
#DROP TABLE market;
DROP TABLE rating;
DROP TABLE route;
DROP TABLE user;

CREATE TABLE user (
sid varchar(8) NOT NULL  UNIQUE,
first_name varchar(50) NOT NULL,
last_name varchar(50) NOT NULL,
email varchar(100) NOT NULL,
phone INTEGER(10),
bio TEXT,
image TEXT,
tokens INTEGER,
PRIMARY KEY (sid));

CREATE TABLE activeDriver (
location varchar(30) NOT NULL UNIQUE,
capacity INTEGER,
PRIMARY KEY (location));

CREATE TABLE activeRider (
pickup_location INTEGER NOT NULL UNIQUE,
PRIMARY KEY (pickup_location));

CREATE TABLE destination (
location_id INTEGER NOT NULL UNIQUE AUTO_INCREMENT,
destination text NOT NULL,
PRIMARY KEY (location_id));

CREATE TABLE history (
time_stamp DATE NOT NULL UNIQUE,
message text NOT NULL,
PRIMARY KEY (time_stamp));

CREATE TABLE rating (
driver_id varchar(8) NOT NULL,
driver_rating INTEGER NOT NULL,
#PRIMARY KEY (driver_id),
FOREIGN KEY (driver_id) REFERENCES user(sid) ON DELETE CASCADE);

CREATE TABLE route (
route_id INTEGER NOT NULL  UNIQUE AUTO_INCREMENT,
route_order INTEGER NOT NULL,
start_time DATE,
pickup_time DATE,
arrive_time DATE,
PRIMARY KEY (route_id));


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
INSERT INTO rating (driver_id, driver_rating) VALUES(
43211157,
5
);