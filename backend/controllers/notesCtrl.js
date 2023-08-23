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

exports.createNote = (req, res, next) => {
  console.log('Create note route called');
  const { title, content } = req.body;
  const userId = req.params.id;
  const note = new Note({
    title,
    content,
    user: userId,
  });
  note
    .save()
    .then((newNote) => {
      res.status(201).json({ note: newNote });
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Erreur lors de la création de la note : ',
        error: error,
      });
    });
};
