const express = require('express');
const router = express.Router();
const blogController = require('./blog.controller');

const authMiddleware = require('../../middlewares/auth.middleware');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Public
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlogById);

// Protected + Upload
router.post(
  '/',
  authMiddleware,
  upload.single('image'),
  blogController.createBlog
);

router.put(
  '/:id',
  authMiddleware,
  upload.single('image'),
  blogController.updateBlog
);

// Update status
router.put('/:id/status', authMiddleware, blogController.updateBlogStatus);

// Delete blog
router.delete('/:id', authMiddleware, blogController.deleteBlog);

module.exports = router;