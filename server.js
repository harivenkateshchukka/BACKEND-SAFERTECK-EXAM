// server.js
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// Middleware for parsing JSON data
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('practice'));

// CreateFile endpoint
app.post('/createFile', (req, res) => {
  const { filename, content } = req.body;
  fs.writeFile(`./practice/${filename}`, content, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Not done with file creation.');
    } else {
      res.status(200).send('Done with file creation.');
    }
  });
});

// GetFiles endpoint
app.get('/getFiles', (req, res) => {
  fs.readdir('./practice', (err, files) => {
    if (err) {
      console.error(err);
      res.status(500).send('Not Found error.');
    } else {
      res.status(200).json(files);
    }
  });
});

// GetFile endpoint
app.get('/getFile/:filename', (req, res) => {
  const { filename } = req.params;
  fs.readFile(`./practice/${filename}`, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(400).send('File not found.');
    } else {
      res.status(200).send(data);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
