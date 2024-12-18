const http = require('http');
const { connectToDB } = require('./database/connection');
const blogsRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contact');

const hostname = '127.0.0.1';
const port = 3000;

const enableCORS = (res) => {
  // Allow requests from your frontend (Live Server)
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Replace with your frontend's URL
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
};

const server = http.createServer((req, res) => {
  enableCORS(res);  // Enable CORS for all requests

  if (req.url === '/' && req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Welcome to my Blog!!!');
  } else if (req.url.startsWith('/blogs')) {
    blogsRoutes(req, res);
  } else if (req.url.startsWith('/contact')) {
    contactRoutes(req, res);
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('404 Not Found');
  }
});

connectToDB().then(() => {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});