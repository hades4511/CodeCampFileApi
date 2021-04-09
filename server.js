const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
require('dotenv').config()

const app = express();

const fileUpload = multer({dest: 'uploads/'});
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', fileUpload.single('upfile'), function (req, res, next) {
  const file = req.file;
  res.json({
    name: file.originalname,
    type: file.mimetype,
    size: file.size
  });
  fs.unlinkSync(path.join(__dirname, 'uploads', file.filename));
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
