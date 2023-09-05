const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  titleNote: { type: String, required: true },
  contentNote: { type: String, required: true },
  user: { type: String, required: true },
  importanceNote: {
    type: String,
    enum: ['basse', 'normale', 'haute'],
    default: 'normale',
  },
  creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
