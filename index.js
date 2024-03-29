// backend/server.js
const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/convert', upload.single('image'), (req, res) => {
  const { path: imagePath, filename } = req.file;
  sharp(imagePath)
    .toFormat('webp')
    .toBuffer()
    .then(data => {
      // Instead of just sending the data, you could also write the file to your server's disk and send a link, or directly send the file back as done here.
      res.type('webp');
      res.send(data);
      // Cleanup the uploaded file after conversion
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Error deleting the original file:", err);
      });
    })
    .catch(err => res.status(500).json({ message: 'Error converting image', error: err }));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
