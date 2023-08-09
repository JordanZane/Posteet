const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user === null) {
        res
          .status(401)
          .json({ message: 'Paire identifiant / mot de passe incorrecte' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            res.status(401).json({
              message: 'Paire identifiant / mot de passe incorrecte',
            });
          } else {
            res.status(200).json({
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
                expiresIn: '24h',
              }),
            });
          }
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getUserInfos = (req, res, next) => {
  const userId = req.params.userId;
  User.findById(userId)
    .then((user) => {
      res.status(200).json({ user });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.resetPassword = (req, res, next) => {
  console.log('reset-pw called backend');
  const userId = req.params.userId;
  const { password, newPassword } = req.body;
  User.findById(userId)
    .then((user) => {
      console.log('User found:', user);
      bcrypt.compare(password, user.password).then((isPasswordValid) => {
        if (!isPasswordValid) {
          console.log('Mot de passe invalide');
          res.status(401).json({ message: 'Mot de passe invalide' });
        } else {
          bcrypt.hash(newPassword, 10).then((hashedNewPassword) => {
            user.password = hashedNewPassword;
            user.save().then(() => {
              console.log('Mot de passe modifié');
              res.status(200).json({ message: 'Mot de passe modifié' });
            });
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
