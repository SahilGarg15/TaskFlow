const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getTaskComments,
  addComment,
  updateComment,
  deleteComment
} = require('../controllers/commentController');

// All routes are protected
router.use(protect);

// Comment routes
router.get('/task/:taskId', getTaskComments);
router.post('/task/:taskId', addComment);
router.put('/:commentId', updateComment);
router.delete('/:commentId', deleteComment);

module.exports = router;
