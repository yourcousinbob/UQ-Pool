#!/usr/bin/expect -f
spawn ./shell/uploadSSH.sh/
expect "Password: 
"
send "Sh4a0l1NBlackJack\n";
expect "s4321115@s4321115-uq-pool.zones.eait.uq.edu.au's password: 
"
send "Sh4a0l1NBlackJack\n";
interact