const Tour = require('../models/tourModel');
const aliasTopTours = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
const getAllTours = async (req, res) => {
  try {
    // Option-1
    // 1-a) FIltering
    const queryObj = { ...req?.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1-b) Advanced filtering
    // {difficulty:'easy', duration :{$gte:5}} - what mongoose wants
    // {difficulty:'easy', duration :{gte:'5'}} - what we get through postman
    // so replace gte,gt,lte,lt with$
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));
    //Option-2
    // const tours = await Tour.find()
    //   .where('duration')
    //   .lte(5)
    //   .where('difficulty')
    //   .equals('easy');

    // 2) Sorting
    if (req?.query?.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      // {duration,price} - what we get from postman
      // { duration price} - what mongo wants
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // 3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      // {name,duration,price} - what we get from postman
      // {name duration price} - what mongo wants
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // 4) Pagination * will convert string into number
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }

    const tours = await query;

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
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
module.exports = {
  getAllTours,
  getToursById,
  createTour,
  deleteTour,
  updateTour,
  aliasTopTours,
};
