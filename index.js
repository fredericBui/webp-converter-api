const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.write('<h1>Send file to /upload to convert your file to webp format</h1>');
}
);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});