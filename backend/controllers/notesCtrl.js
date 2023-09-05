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
    creationDate: Date.now(),
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

exports.modifyNote = async (req, res, next) => {
  console.log('Modify route called');
  const userId = req.params.userId;
  const noteId = req.params.noteId;

  try {
    const updatedNoteData = req.body;

    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      updatedNoteData,
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note non trouvée' });
    }

    res.status(200).json({ note: updatedNote });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la note : ',
      error: error,
    });
  }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const noteId = req.params.noteId;

    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await Note.deleteOne({ _id: noteId });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.log('Error deleting note:', error);
    res
      .status(500)
      .json({ message: 'An error occurred while deleting the note' });
  }
};
