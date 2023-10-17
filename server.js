const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  // Set the content type based on the file extension
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
  };

  // Get the file path based on the requested URL
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html'; // Serve index.html by default
  }

  // Determine the content type based on the file extension
  const extname = path.extname(filePath);
  const contentTypeHeader = contentType[extname] || 'text/plain';

  // Check if the file exists
  fs.access(filePath, fs.constants.R_OK, (err) => {
    if (!err) {
      // Read and serve the file
      fs.readFile(filePath, (err, data) => {
        if (!err) {
          res.writeHead(200, { 'Content-Type': contentTypeHeader });
          res.end(data);
        } else {
          res.writeHead(500); // Internal server error
          res.end('Internal Server Error');
        }
      });
    } else {
      res.writeHead(404); // Not found
      res.end('File not found');
    }
  });
});

const port = process.env.PORT || 3000; // Use port 3000 by default, or specify one using the PORT environment variable
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
