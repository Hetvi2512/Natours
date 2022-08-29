const express = require('express');
const {
  getUser,
  createUser,
  deleteUser,
  getAllUsers,
  updateUser,
} = require('../controllers/userController');
const router = express.Router();

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
router.route('/').get(getAllUsers).post(createUser);

module.exports = router;
