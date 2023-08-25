const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
  titleNote: { type: String, required: true },
  contentNote: { type: String, required: true },
});

module.exports = mongoose.model('Note', noteSchema);
