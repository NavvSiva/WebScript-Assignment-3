const mongoose = require('mongoose');


const URI = 'mongodb+srv://abhinav:abhinav@assignment3.zp87c.mongodb.net/?retryWrites=true&w=majority&appName=Assignment3';

mongoose.connect(URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose;
