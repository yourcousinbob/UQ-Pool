import json as j
import requests as R

s = R.session()
url = 'https://uqpool.xyz:7777/rewards'
headers = {'content-type': 'application/json'}

if __name__ == "__main__":
    print('user exists test')
    content = s.get(url).content
    payload = j.loads(content)
    print(payload)