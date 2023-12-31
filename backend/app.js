const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');

const userRouteSign = require('./routes/signup');
const userRouteLog = require('./routes/login');
const usersRoute = require('./routes/users');
const notesRoute = require('./routes/notes');
const sendEmailRoute = require('./routes/sendEmail');

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    tlsAllowInvalidCertificates: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use('/signup', userRouteSign);
app.use('/login', userRouteLog);
app.use('/users', usersRoute);
app.use('/notes', notesRoute);
app.use('/send-email', sendEmailRoute);

module.exports = app;
