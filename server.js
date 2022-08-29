const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const port = 3000;
dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('App connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log('App is listening on port 3000');
});
