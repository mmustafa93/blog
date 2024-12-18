const http = require('http');
const { connectToDB } = require('./database/connection');
const blogsRoutes = require('./routes/blogs');
const contactRoutes = require('./routes/contact');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    // Handle homepage
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain'); // Change to 'text/html' if you want to send HTML
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

// Connect to MongoDB before starting the server
connectToDB().then(() => {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});