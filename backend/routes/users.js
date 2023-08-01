const express = require('express');
const router = express.Router();

const User = require('../models/User');

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
});

module.exports = router;
