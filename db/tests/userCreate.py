import json as j
import requests as R

s = R.session()
# Testing already existing user message
data = {
    "sid": 43211157,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@nike.com",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}
headers = {'content-type': 'application/json'}
# Testing email 
data2 = {
    "sid": 44310000,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@nike.com",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}

# Testing wrong student digit count
data3 = {
    "sid": 5533,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@student.uq.edu.au",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}

# Testing proper insert
data4 = {
    "sid": 12312322,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@student.uq.edu.au",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}

url = 'http://localhost:7777/user'

if __name__ == "__main__":
    print('user exists test')
    content = s.post(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)
    print('invalid email test')
    content = s.post(url, json=data2, headers=headers).content
    payload = j.loads(content)
    print(payload)
    print('wrong digit number test')
    content = s.post(url, json=data3, headers=headers).content
    payload = j.loads(content)
    print(payload)
    print('success test')
    content = s.post(url, json=data4, headers=headers).content
    payload = j.loads(content)
    print(payload)
