const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  titleNote: { type: String, required: true },
  contentNote: { type: String, required: true },
  user: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
