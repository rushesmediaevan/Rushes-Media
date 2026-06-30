import os, sys
os.chdir(os.path.dirname(os.path.abspath(__file__)))
port = int(os.environ.get('PORT', '3000'))
from http.server import HTTPServer, SimpleHTTPRequestHandler
HTTPServer(('', port), SimpleHTTPRequestHandler).serve_forever()
