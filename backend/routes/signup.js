const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userCtrl');
const isValidateInputs = require('../middlewares/isValidInputs');

router.post('/', isValidateInputs.validateInput, userCtrl.signup);

module.exports = router;
