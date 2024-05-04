const express = require('express');
const sharp = require('sharp');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/convert', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const { path: imagePath } = req.file;
  const format = req.query.format || 'webp'; // Default to webp if no format specified

  try {
    if (format === 'pdf') {
      // Convert JPEG to PDF
      const imageBytes = fs.readFileSync(imagePath);
      const pdfDoc = await PDFDocument.create();
      const image = await pdfDoc.embedJpg(imageBytes);
      const page = pdfDoc.addPage();
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: page.getWidth(),
        height: page.getHeight(),
      });
      const pdfBytes = await pdfDoc.save();
      res.type('application/pdf').send(Buffer.from(pdfBytes));
    } else {
      // Handle other formats using Sharp
      let processedImage = sharp(imagePath);
      switch (format) {
        case 'png':
          processedImage = processedImage.toFormat('png');
          break;
        case 'webp':
          processedImage = processedImage.toFormat('webp');
          break;
        default:
          throw new Error('Unsupported format');
      }
      const data = await processedImage.toBuffer();
      res.type(format).send(data);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error converting image', error: err });
  } finally {
    fs.unlink(imagePath, err => {
      if (err) {
        console.error("Failed to delete the uploaded file:", err);
      }
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
