import json as j
import requests as R
import sys
s = R.session()

headers = {'content-type': 'application/json'}
url = 'http://uq-pool.uqcloud.net/login'

res = s.get(url)
content = res.content
header = res.header
print(content)
