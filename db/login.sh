#!/usr/bin/expect -f
spawn ./shell/mysqlClient.sh/
expect "Enter password: "
send "GeN7NoLoBl@ckJ@ck\n";
interact