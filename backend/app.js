const express = require('express');

const app = express();

app.use((req, res) => {
  res.json({ message: 'Requête bien recue' });
});

module.exports = app;
