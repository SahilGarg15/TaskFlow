const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  exportTasksCSV,
  exportTasksJSON,
  importTasks
} = require('../controllers/exportController');

// All routes are protected
router.use(protect);

// Export routes
router.get('/csv', exportTasksCSV);
router.get('/json', exportTasksJSON);

// Import route
router.post('/import', importTasks);

module.exports = router;
