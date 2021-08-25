import json as j
import requests as R

s = R.session()

headers = {'content-type': 'application/json'}

# Just putting info
data = {
    "sid": 12312322,
"first_name": "Alan",
"last_name": "Doppler",
"email": "stussy@student.uq.edu.au",
"phone": 444777111,
"bio" : "whatever floats your boat",
"image": "test",
}

url = 'http://localhost:7777/users'

if __name__ == "__main__":
    print('users list test')
    content = s.get(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)
