const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  // Serve index.html for root path
  if (req.url === '/' || req.url === '/index.html') {
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end('<h1>404 - File not found</h1>');
      } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>404 - Page not found</h1>');
  }
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});