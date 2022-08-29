const Tour = require('../models/tourModel')

const checkBody = (req, res, next)=>{
  console.log("checkbody",req.body)
  if(!req.body.name || !req.body.price)
  {
    return res.status(400).json({
      status: 'fail',
      message: 'Name or Price is required'
    });
  }
  next();
}
const getAllTours = (req, res) => {
  // res.status(200).json({ status: 'success', results: tours?.length, tours });
};
const getToursById = (req, res) => {
  // res.status(200).json({ status: 'success', tour: tour ? tour : 'Invalid Id' });
};
const createTour = (req, res) => {
 
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
  checkBody
};
