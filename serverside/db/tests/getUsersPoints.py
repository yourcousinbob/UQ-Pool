import json as j
import requests as R

s = R.session()
headers = {'content-type': 'application/json'}

data = {
    "sid": 45299038,
}

url = 'https://uqpool.xyz:7777/rewards'

if __name__ == "__main__":
    content = s.post(url, json=data, headers=headers).content
    payload = j.loads(content)
    print(payload)