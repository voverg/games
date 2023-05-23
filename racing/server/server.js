import http from 'http';
import path from 'path';
import express from 'express';

// Configuration
const PORT = 3000;
const DOCROOT = '../dist/';

// Create server with express and http
const app = express();
const server = http.createServer(app);

// Return the static game files whith server request
const docRoot = path.resolve(DOCROOT);
const staticFiles = express.static(docRoot);
app.use(staticFiles);
// console.log(docRoot);

// Run server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});