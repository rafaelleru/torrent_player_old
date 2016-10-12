import socket
import json

s = socket.socket(socket.AF_INET,
                  socket.SOCK_STREAM)

host = socket.gethostname() # Esto hay que revisarlo
port = 9997
a = {'test':1, 'dict':{1:2, 3:4}, 'list': [42, 16]}

s.connect((host, port))
a_json=json.dumps(a).encode('utf-8')
s.sendall(a_json)
tm = s.recv(1024) # por ahora lee solo 1024 bytes de la respuesta del server

s.close()
print("Respuesta del server: \n %s" % tm.decode('ascii'))
