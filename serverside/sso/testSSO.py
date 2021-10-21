from seleniumwire import webdriver as driver
from selenium.webdriver import Dispose
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.expected_conditions import (presence_of_element_located)
from selenium.webdriver.support.wait import WebDriverWait
import requests as r
import time
import re as Re
from icalendar import Calendar, Event

url = "http://s4321115-uq-pool.uqcloud.net/test.php"
iCalURL = "https://timetable.my.uq.edu.au/odd/"

# just for ease of logging

def log():
    for request in d.requests:
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

# get the headers
log()

# Now we're looking for the student module
studentModule = [a for a in d.find_elements_by_tag_name('a') if a.text == "Student Module"][0]
studentModule.click()
time.sleep(2)

# Finally, get the link to the ical calendar
text = d.page_source
x = Re.search('iCalURL =.*;', text)
icalUrl = text[x.start():x.end()]
icalUrl = icalUrl.replace('"', '')
icalUrl = iCalURL+icalUrl.replace('iCalURL = ', '')
cal = Calendar.from_ical(s.get(icalUrl).content)
for c in cal.walk():
    if c.name == "VEVENT":
        print(c.get('summary'))
        print(c.get('description'))
        print(c.get('location'))
        print(c.get('dtstart').dt)
        print(c.get('dtend').dt)
