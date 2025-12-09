const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskStats
} = require('../controllers/taskController');
const {
  getTaskAnalytics,
  bulkUpdateTasks,
  archiveTask,
  duplicateTask
} = require('../controllers/advancedTaskController');
const { protect, validateObjectId } = require('../middleware/authMiddleware');

const router = express.Router();

// Validation rules
const taskValidation = [
  body('title').trim().notEmpty().withMessage('Task title is required'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed'])
    .withMessage('Invalid status value'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high'])
    .withMessage('Invalid priority value')
];

// All routes are protected
router.use(protect);

// Task routes
router.route('/')
  .get(getTasks)
  .post(taskValidation, createTask);

router.get('/stats', getTaskStats);
router.get('/analytics', getTaskAnalytics);
router.put('/bulk', bulkUpdateTasks);

router.route('/:id')
  .get(validateObjectId('id'), getTask)
  .put(validateObjectId('id'), taskValidation, updateTask)
  .delete(validateObjectId('id'), deleteTask);

router.put('/:id/archive', validateObjectId('id'), archiveTask);
router.post('/:id/duplicate', validateObjectId('id'), duplicateTask);

module.exports = router;
