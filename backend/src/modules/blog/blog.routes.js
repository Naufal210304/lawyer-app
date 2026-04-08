const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');

const authMiddleware = require('../../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Public
router.get('/', blogController.getBlogs);

// Protected + Upload
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  blogController.createBlog
);

module.exports = router;