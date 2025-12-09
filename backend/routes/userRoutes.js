const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/userController');
const { protect, authorize, validateObjectId } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected and require admin role
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(validateObjectId('id'), getUser)
  .put(validateObjectId('id'), updateUser)
  .delete(validateObjectId('id'), deleteUser);

module.exports = router;
