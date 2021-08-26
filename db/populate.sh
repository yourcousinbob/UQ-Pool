#!/usr/bin/expect -f
spawn ./shell/mysqlClient.sh/
expect "Enter password: "
send "WilsonLOVE";
expect "mysql> "
send "use UQPool\n";
expect "mysql> "
send "source DB_SCHEMA.sql\n";
expect "mysql> "
send "exit\n";
interact
