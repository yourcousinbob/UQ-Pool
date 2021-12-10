import asyncio
import socketio
import time
import sys

sio = socketio.AsyncClient()

@sio.event
async def connect():
    print('user', sid, ' connection established')
    x, y = 0.0, 0.0
    await sio.emit('login', {'user': sid})
    for i in range(1, 10):
        time.sleep(0.3)
        await sio.emit('location', {'user': sid, 'location': [x+float(i), y-float(i)]})

@sio.event
async def login(data):
    print('from ', sid, ' user', data['user'], ' has logged in')

@sio.event
async def logout(data):
    print('from ', sid, ' user', data['user'], ' has logged out')

@sio.event
async def location(data):
    print('from ', sid, 'user', data['user'], 'location', data['location'])

@sio.event
async def disconnect():
    print('disconnected from server')

async def main():
    await sio.connect('https://uqpool.xyz:7777')
    await sio.wait()

sid = 0
if __name__ == '__main__':
    sid = sys.argv[1]
    asyncio.run(main())

