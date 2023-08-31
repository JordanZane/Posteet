const express = require('express');
const router = express.Router();
const sendEmailCtrl = require('../controllers/sendEmail');

router.post('/', sendEmailCtrl.sendEmail);

module.exports = router;
