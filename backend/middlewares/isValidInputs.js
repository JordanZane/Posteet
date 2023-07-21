const { body, validationResult } = require('express-validator');

// Middleware de validation
exports.validateInput = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Adresse e-mail non valide'),
  body('password')
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, 'i')
    .withMessage(
      'Le mot de passe ne doit contenir que des lettres et des chiffres'
    ),
  body('username')
    .trim()
    .matches(/^[a-zA-Z0-9]+$/, 'i')
    .withMessage(
      "Le nom d'utilisateur ne doit contenir que des lettres et des chiffres"
    ),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
