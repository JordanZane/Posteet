const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // Change the rate before the online uploading
  max: 3,
});

module.exports = limiter;
