import json as j
import requests as R

s = R.session()
url = 'https://uqpool.xyz:7777/rewards'

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