import os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
sys.argv = ['server', '3000']
from http.server import HTTPServer, SimpleHTTPRequestHandler
HTTPServer(('', 3000), SimpleHTTPRequestHandler).serve_forever()
