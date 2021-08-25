import json as j
import requests as R

s = R.session()
headers = {'content-type': 'application/json'}

# Testing inexistent driver
data = {
    "driver_id": 22222222,
"driver_rating": 5
}

# Testing successful rating
data2 = {
    "driver_id": 43211157,
"driver_rating": 5
}

url = 'http://localhost:7777/rate'

if __name__ == "__main__":
    print('user does not exist test')
    content = s.post(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)
    print('success rating test')
    content = s.post(url, json=data2, headers=headers).content
    payload = j.loads(content)
    print(payload)
