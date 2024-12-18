// server/routes/blogs.js
const { parse } = require('querystring');
const Blog = require('../database/BlogModel.js');  // Import Blog model

const blogsRoutes = (req, res) => {
  if (req.method === 'GET' && req.url === '/blogs') {
    // Get all blogs
    Blog.find()
      .then((blogs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(blogs));
      })
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Error fetching blogs' }));
      });
  } else if (req.method === 'GET' && req.url.startsWith('/blogs/')) {
    // Get a single blog by ID
    const blogId = req.url.split('/')[2];
    Blog.findById(blogId)
      .then((blog) => {
        if (!blog) {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: 'Blog not found' }));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(blog));
        }
      })
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Error fetching blog' }));
      });
  } else if (req.method === 'POST' && req.url === '/blogs') {
    // Create a new blog
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const { title, content, imageUrl } = JSON.parse(body);

      const newBlog = new Blog({
        title,
        content,
        imageUrl,
      });

      newBlog
        .save()
        .then((savedBlog) => {
          res.statusCode = 201;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(savedBlog));
        })
        .catch((err) => {
          console.error(err);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Error creating blog' }));
        });
    });
  } else if (req.method === 'PUT' && req.url.startsWith('/blogs/')) {
    // Edit a single blog by ID
    const blogId = req.url.split('/')[2];

    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const { title, content, imageUrl } = JSON.parse(body);

      Blog.findByIdAndUpdate(blogId, { title, content, imageUrl }, { new: true })
        .then((updatedBlog) => {
          if (!updatedBlog) {
            res.statusCode = 404;
            res.end(JSON.stringify({ message: 'Blog not found' }));
          } else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(updatedBlog));
          }
        })
        .catch((err) => {
          console.error(err);
          res.statusCode = 500;
          res.end(JSON.stringify({ message: 'Error updating blog' }));
        });
    });
  } else if (req.method === 'DELETE' && req.url.startsWith('/blogs/')) {
    // Delete a single blog by ID
    const blogId = req.url.split('/')[2];

    Blog.findByIdAndDelete(blogId)
      .then((deletedBlog) => {
        if (!deletedBlog) {
          res.statusCode = 404;
          res.end(JSON.stringify({ message: 'Blog not found' }));
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ message: 'Blog deleted successfully' }));
        }
      })
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end(JSON.stringify({ message: 'Error deleting blog' }));
      });
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
};

module.exports = blogsRoutes;