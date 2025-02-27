from http.server import SimpleHTTPRequestHandler
from socketserver import TCPServer

PORT = 8000

# Créer un serveur HTTP simple
with TCPServer(("", PORT), SimpleHTTPRequestHandler) as httpd:
    print(f"Serveur démarré sur le port {PORT}. Ouvrez http://localhost:{PORT} dans votre navigateur.")
    httpd.serve_forever()