import json as j
import requests as R

s = R.session()
# adding account for test
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

url = 'http://localhost:7777/user'

if __name__ == "__main__":
    content = s.post(url, json=data, headers=headers).content
    payload = j.loads(content)
    print('user delete test')
    content = s.delete(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)
