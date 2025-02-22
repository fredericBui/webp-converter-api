const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const webp = require('webp-converter');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = path.join(__dirname, req.file.path);
  const output = path.join(__dirname, req.file.path + '.webp');
  const result = webp.cwebp(filePath, output, "-q 80", logging = "-v");
  result.then((response) => {
    console.log(response);
    res.download(output);
    fs.rm(filePath, function (err) {
      if (err) throw err;
      console.log('Successfully deleted the uploaded file');
    });
    fs.rm(output, function (err) {
      if (err) throw err;
      console.log('Successfully deleted the converted file');
    }
    );
  });
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});