'use strict';

// All the routes for our app
// =============================================================================

const express = require('express');
const router = express.Router();

let API = {};
API.bears = require('../controllers/bears');


// middleware to use for all requests (many uses for this - validation of request;
// extra logging for analytics or statistics)
router.use(function(req, res, next) {
  console.log('Something is happening.');
  next();
});

// test route to make sure everything is working (accessed at GET http://localhost:4000/api)
router.get('/', (req, res) => { res.json({ message: 'hooray! welcome to our api!' })})

// API ROUTES ==================================================================

// Bear routes
router
  .post('/bears', API.bears.create)
  .get('/bears', API.bears.getAll)
  .get('/bears/:bear_id', API.bears.get)
  .put('/bears/:bear_id', API.bears.update)
  .delete('/bears/:bear_id', API.bears.delete);

module.exports = router;
