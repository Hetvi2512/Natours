const express = require('express');
const {
  createTour,
  deleteTour,
  getAllTours,
  getToursById,
  updateTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan
} = require('../controllers/tourController');
const router = express.Router();

// router.param runs for certain parameter only
//router.param('id', checkID)

router.route('/top-5-cheap').get(aliasTopTours,getAllTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)
router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getToursById).patch(updateTour).delete(deleteTour);

module.exports = router;
