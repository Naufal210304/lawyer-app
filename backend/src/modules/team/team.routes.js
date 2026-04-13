const express = require('express');
const router = express.Router();
const teamController = require('./team.controller');
const authMiddleware = require('../../middlewares/auth.middleware');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'team-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
}).single('image');

// All routes require authentication
router.use(authMiddleware);

// GET /api/team - Get all team members
router.get('/', teamController.getAllTeamMembers);

// GET /api/team/:id - Get team member by ID
router.get('/:id', teamController.getTeamMemberById);

// POST /api/team - Create new team member with file upload
router.post('/', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, teamController.createTeamMember);

// PUT /api/team/:id - Update team member with file upload
router.put('/:id', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, teamController.updateTeamMember);

// DELETE /api/team/:id - Delete team member
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;