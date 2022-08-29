const fs = require('fs');
const Tour = require('../models/tourModel')
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

const checkID = (req, res, next, val) => {
  // Middle Ware
  console.log(`Tour id is: ${val}`);
 if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

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
  res.status(200).json({ status: 'success', results: tours?.length, tours });
};
const getToursById = (req, res) => {
  const tour = tours.find((el) => el.id === +req.params.id);
  res.status(200).json({ status: 'success', tour: tour ? tour : 'Invalid Id' });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
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
  checkID,
  checkBody
};
