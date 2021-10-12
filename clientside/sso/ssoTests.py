from seleniumwire import webdriver as driver
from selenium.webdriver import Dispose
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.expected_conditions import (presence_of_element_located)
from selenium.webdriver.support.wait import WebDriverWait
import requests as r
import time

url = "http://uq-pool.uqcloud.net"

# just for ease of logging

def log():
    for request in driver.requests:
        print(request.url)
        print(request.headers) 
        print(request.response.headers)

d = driver.Chrome()
s = r.session()
d.get(url)
time.sleep(3)
log()
forms = d.find_elements_by_tag_name('input') 
user = forms[0]
password = forms[1]
submit = forms[2]

# Just use your sid and password to get redirected
user.send_keys('s4321115')
password.send_keys('Sh4a0l1NBlackJack')
submit.click()
time.sleep(3)

# The page is now the forms consent
button = d.find_elements_by_tag_name('button')[0]
button.click()
time.sleep(3)
for request in driver.requests:
  print(request.url)
print(request.headers) 
print(request.response.headers)