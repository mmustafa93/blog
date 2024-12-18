// server/routes/contact.js
const contactRoutes = (req, res) => {
    if (req.method === 'GET' && req.url === '/contact') {
      // Return contact information or a simple message
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        message: 'Welcome to the contact page! You can reach us at example@example.com.'
      }));
    } else {
      res.statusCode = 404;
      res.end('404 Not Found');
    }
  };
  
  module.exports = contactRoutes;