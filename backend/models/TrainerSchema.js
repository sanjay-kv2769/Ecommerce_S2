const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    default: 1,
  },
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model('TrainerDetails', TrainerSchema);
