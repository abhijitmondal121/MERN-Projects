const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: true,
  },
  allTopic: {
    type: [String],
    required: true
  },
}, { timestamps: true });

module.exports = mongoose.model('Item', itemSchema);