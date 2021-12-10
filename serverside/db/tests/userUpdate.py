import json as j
import requests as R

s = R.session()
# Testing non existing
data = {
    "sid": 55522212,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@nike.com",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}
headers = {'content-type': 'application/json'}

# using proper insert for update
data2 = {
    "sid": 12312322,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@student.uq.edu.au",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}

# updated info
data3 = {
    "sid": 12312322,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@student.uq.edu.au",
"phone": 444777111,
"bio" : "Update your boat to float better",
"image": "test",
}

url = 'http://localhost:7777/user'

if __name__ == "__main__":
    print('non existent user test')
    content = s.put(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)
    content = s.post(url, json=data2, headers=headers).content
    payload = j.loads(content)
    print('Update success test')
    content = s.put(url, json=data3, headers=headers).content
    payload = j.loads(content)
    print(payload)
