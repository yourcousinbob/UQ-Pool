import asyncio
import socketio
import time
import sys

sio = socketio.AsyncClient()

@sio.event
async def connect():
    print('connection established')

@sio.event
async def my_message(data):
    print('message received with ', data)
    await sio.emit('location', {'location': ['55.5555', '22.2222']})

@sio.event
async def disconnect():
    print('disconnected from server')

async def main(sid):
    x, y = 0.0, 0.0
    await sio.connect('http://103.4.234.91:7777')
    await sio.wait()
    for i in range(1, 10):
        time.delay(2)
        await sio.emit('location', {'sid': sid, 'location': [x+float(i), y-float(i)]})

if __name__ == '__main__':
    asyncio.run(main(sys.argv[1]))

