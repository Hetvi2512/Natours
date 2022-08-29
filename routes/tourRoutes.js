const express = require('express');
const {
  createTour,
  deleteTour,
  getAllTours,
  getToursById,
  updateTour,
  checkBody,
} = require('../controllers/tourController');
const router = express.Router();

// router.param runs for certain parameter only
//router.param('id', checkID)

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getToursById).patch(updateTour).delete(deleteTour);

module.exports = router;
