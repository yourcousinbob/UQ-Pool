import json as j
import requests as R

s = R.session()
headers = {'content-type': 'application/json'}

# Testing inexistent driver
data = {
    "sid": 22222222,
    "rating": 5
}

# Testing successful rating
data2 = {
    "sid": 43211157,
    "rating": 5
}

url = 'https://uqpool.xyz:7777/rate'

if __name__ == "__main__":
    print('user does not exist test')
    content = s.post(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)
    print('success rating test')
    content = s.post(url, json=data2, headers=headers).content
    payload = j.loads(content)
    print(payload)
