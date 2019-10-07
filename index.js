const http = require('http');

const handler = (req, res) => {
  res.end('HELLO WORLD AGAIN');
};

const server = http.createServer(handler);

server.listen(3000);