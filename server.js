// backend/server.js
const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/convert', upload.single('image'), (req, res) => {
  const { path: imagePath, filename } = req.file;
  sharp(imagePath)
    .toFormat('webp')
    .toBuffer()
    .then(data => {
      res.type('webp');
      res.send(data);
    })
    .catch(err => res.status(500).json({ message: 'Error converting image', error: err }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
