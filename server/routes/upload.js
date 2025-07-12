const express = require('express');
const path = require('path');
const upload = require('../utils/fileUpload');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Protect all routes
router.use(protect);

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
router.post('/', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    res.status(200).json({
      success: true,
      data: {
        fileName: req.file.filename,
        filePath: `/uploads/${req.file.filename}`
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', upload.array('images', 5), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'Please upload at least one file' });
    }

    const fileData = req.files.map(file => ({
      fileName: file.filename,
      filePath: `/uploads/${file.filename}`
    }));

    res.status(200).json({
      success: true,
      count: fileData.length,
      data: fileData
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router; 