import socket
import json as j

device_ip = 'uqpool.xyz'
device_port = 7777

s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.settimeout(5)
s.connect((device_ip, device_port))

# Testing already existing user message
data = {
"driver_id": 43211157,
"location": "Dreamworld",
"destination": "The University of Queensland"
}

if __name__ == "__main__":
    s.sendall(data)
    content = s.recv(4096)
    payload = j.loads(content)
    print(payload)
