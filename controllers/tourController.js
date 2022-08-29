const Tour = require('../models/tourModel');

const getAllTours = (req, res) => {
  // res.status(200).json({ status: 'success', results: tours?.length, tours });
};
const getToursById = (req, res) => {
  // res.status(200).json({ status: 'success', tour: tour ? tour : 'Invalid Id' });
};
const createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(200).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Update Tour....',
    },
  });
};
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours?.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
module.exports = {
  getAllTours,
  getToursById,
  createTour,
  deleteTour,
  updateTour,
};
