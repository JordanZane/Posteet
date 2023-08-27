const Note = require('../models/Notes');

exports.getUserNotes = (req, res, next) => {
  console.log('Get notes route called');
  const userId = req.params.userId;
  Note.find({ user: userId })
    .then((notes) => {
      res.status(200).json({ notes: notes });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.createNote = (req, res, next) => {
  console.log('Create note route called');
  const userId = req.params.userId;
  const { titleNote, contentNote } = req.body;
  const note = new Note({
    titleNote,
    contentNote,
    user: userId,
  });
  note
    .save()
    .then((newNote) => {
      res.status(201).json({ note: newNote });
    })
    .catch((error) => {
      console.error("Erreur lors de l'enregistrement de la note : ", error);

      res.status(500).json({
        message: 'Erreur lors de la création de la note : ',
        error: error,
      });
    });
};
