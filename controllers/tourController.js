const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json({ status: 'success', results: tours?.length, tours });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
const getToursById = async (req, res) => {
  try {
    const tour = await Tour.findById(req?.params?.id);
    res.status(200).json({ status: 'success', tour });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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
const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req?.params?.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
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
