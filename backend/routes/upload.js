/* Multer allows file uploads to the 
'uploads' directory */

const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Set up multer storage
// (this is where uploaded files will be saved)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Create a unique filename by adding the current 
    // timestamp to the original filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize the upload variable using the storage configuration
const upload = multer({ storage });

// Handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
    // 'upload.single' means we expect only one file in the request (with the key 'file')
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
      }
  
    res.json({ filePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
