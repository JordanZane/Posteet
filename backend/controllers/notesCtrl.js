const Note = require('../models/Notes');

exports.getUserNotes = (req, res, next) => {
  console.log('Get notes route called');
  const userId = req.params.id;
  Note.find({ userId: userId })
    .then((notes) => {
      res.status(200).json({ notes: notes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
