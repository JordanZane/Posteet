const express = require('express');
const router = express.Router();
const noteCtrl = require('../controllers/notesCtrl');
const auth = require('../middlewares/auth');

router.get('/:userId', auth, noteCtrl.getNotes);

module.exports = router;
