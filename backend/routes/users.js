const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

router.get('/:userId', auth, userCtrl.getUserInfos);
router.post('/reset-pw/:userId', auth, userCtrl.resetPassword);
router.post('/reset-pw-email/:userId', userCtrl.resetPasswordFromEmail);
router.delete('/delete-account/:userId', auth, userCtrl.deleteAccount);

module.exports = router;
