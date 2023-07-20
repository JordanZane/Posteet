const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.signup = (req, res, next) => {
  console.log('signup route called');

  const { username, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      const user = new User({
        username: username,
        email: email,
        password: hash,
      });
      user
        .save()
        .then(() => {
          console.log('user créer : ', user);
          res.status(201).json({ message: 'user créer' });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
