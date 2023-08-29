const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/notesCtrl');
const auth = require('../middlewares/auth');

router.get('/:userId', auth, noteCtrl.getUserNotes);
router.post('/:userId', auth, noteCtrl.createNote);
router.put('/:userId/:noteId', auth, noteCtrl.modifyNote);
router.delete('/:userId/:noteId', auth, noteCtrl.deleteNote);

module.exports = router;
