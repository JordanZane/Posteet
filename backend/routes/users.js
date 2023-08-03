const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const auth = require('../middlewares/auth');

router.get('/:userId', auth, userCtrl.getUserInfos);
router.post('/reset-pw/:userId', auth, userCtrl.resetPassword);

module.exports = router;
