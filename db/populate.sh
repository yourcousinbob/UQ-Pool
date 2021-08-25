#!/usr/bin/expect -f
spawn ./shell/mysqlClientPopulate.sh/
expect "Enter password: "
send "GeN7NoLoBl@ckJ@ck\n";
interact