import time
import socket
import json 
# creating a socket object
s = socket.socket(socket.AF_INET,
				  socket.SOCK_STREAM)

# get local Host machine name
host = socket.gethostname() # or just use (host == '')
port = 9997

# bind to pot
s.bind((host, port))

# Que up to 5 requests
s.listen(5)

while True:
	# establish connection
	clientSocket, addr = s.accept()
	print("Conexion desde %s" % str(addr))
	b = b''
	tmp = clientSocket.recv(1024)
	b += tmp
	d = json.loads(b.decode('utf-8'))
	print('Received\n', d)
	clientSocket.send("Nuevo album recibido".encode('ascii'))
	clientSocket.close()
