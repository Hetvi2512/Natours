const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(morgan('dev')); // To get logs
app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

// Option-1
// app.get('/api/v1/tours', getAllTours);

// app.get('/api/v1/tours/:id', getToursById);

// app.post('/api/v1/tours', createTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('/api/v1/tours/:id', deleteTour);
