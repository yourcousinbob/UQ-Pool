#!/usr/bin/expect -f
spawn ./shell/mysqlClient.sh/
expect "Enter password: "
send "WilsonLOVE";
interact
