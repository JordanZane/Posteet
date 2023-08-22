const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({});

module.exports = mongoose.model('Note', noteSchema);
