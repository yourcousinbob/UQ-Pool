# current passPhrase for the uq-pool zone :
UQ-poolBlackJack2021!

# current default image is z1standard (3%CPU average guaranteed), capped at 80%

# Now run for image list:
triton image list

# We will choose webproject as it contains most installations ready for use

# Checking networks
triton network list
# SHORTID   NAME               SUBNET            GATEWAY        FABRIC  VLAN  PUBLIC
# ab964f41  My-Fabric-Network  192.168.128.0/22  192.168.128.1  true    2     false
# b10a8f1c  zones              -                 -              -       -     true
# The zone should be zones and allowed for public access to the website.

# Meta tags for installation of webproject services
services=php mysql nodejs etc...

# Now that we’ve chosen our basic parameters for our zone (a name, a package, an image, and the networks to use), we can finally create it.

# below is what is configured
:
#triton inst create --wait --name uq-pool --network zones webproject z1-standard
# check account limits with
#triton account limit

# ram         512    512

# once setup and installed, use the same credentials (passphrase) as when using sdc-setup, repeated below with user root:
# UQ-poolBlackJack21!

# Example for ssh from within uq zone (moss, mango, vpn etc)
# ssh root@uq-pool.zones.eait.uq.edu.au 

# Adding the team's usernames:
# entering the zone:
triton inst exec uq-pool -- bash -login
# uq-add-user <username>
# triton inst exec uq-pool uq-add-user s4321115

# Connecting from outside UQ for administering the server
# Requires changing the config file with the command below on your local machine
echo """Host *.zones.eait.uq.edu.au
  ProxyJump <SID>@moss.eait.uq.edu.au""" >> ~/.ssh/config

# ssh s4321115@s4321115-uq-pool.zones.eait.uq.edu.au
# type in your uq student password

#In the default state,    nginx    will serve static files from the    /var/www/htdocs 

# Add node js to access other services when a user tries to connect from outside the uq-zone (IE mobile phone on uq-pool app)
# We can see which frameworks are enabled by running the command    
#webprojctl status
#webprojctl enable nodejs
# * Place your project in /var/www/nodejs
# * node will load app.js in that directory -- to change this edit
#webprojctl enable mysql
# * The MySQL "root" user password can be retrieved by running "mdata-get mysql_pw"
#password is: a9737d6a217464dd51c96d38

#students to be added
triton inst exec uq-pool -- bash -login
uq-add-user s46094511
uq-add-user s45829211
uq-add-user s45299038
uq-add-user s43855887
uq-add-user s45829257

# Configuring SSO 
vim /etc/nginx/conf.d/auth.conf

# Below rules are for default allow public access:

map   $uri   $acl   { 
 default   "allow:*"; 
 }

# Once configuration is set run for restarting nanx
sudo systemctl reload nginx

## SSO usage for nodejs is in www/nodejs/app.js.

When a user accesses the nodejs endPoint './login' redirect them to:
https://api.uqcloud.net/login/http://uq-pool.uqcloud.net:8081/timetable which will retrieve the nanx X-KVD-PAYLOAD containing the user's authed info to be passed in the express endPoint across the internal UQ zone network services for retrieving the LDAP data (time table).

## Test case: ssotest.py

# Change the user name and password to your own and run the test
# Make sure Selenium and its driver is installed, the path configured correctly as follows:
# get the driver from: 
# cd ~/Downloads
# mv chromedriver /usr/local/bin

# note: changing from nodejs to php 
## the file is in /var/www/htdocs/test.php
logs for any errors in the php are in:
# /var/log/php/errors.log Insertion on word: /


