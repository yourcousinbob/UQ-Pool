import json as j
import requests as R

s = R.session()
data = {
    "user": "Dirk",
"first": "Alan",
"last": "Doppler",
"email": "stussy@nike.com"
}
params = {"user": "Dirk",
"first": "Alan",
"last": "Doppler",
"email": "stussy@nike.com"
}
headers = {'content-type': 'application/json'}
url = 'http://localhost:7777/user'

if __name__ == "__main__":
    content = s.post(url, params=params, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)