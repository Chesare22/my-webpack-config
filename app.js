import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hai')
});

server.listen(9000);