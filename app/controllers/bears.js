
var Bear = require('../models/bear');

// Create a bear
exports.create = function(req, res) {
  var bear = new Bear();
  bear.name = req.body.name;

  bear.save(function(err) {
    if (err)
      res.send(err);

    res.json(bear);
  });
};

// Get all bears
exports.getAll = function(req, res) {
  Bear.find(function(err, bears) {
    if (err)
      res.send(err);

    res.json(bears);
  });
};

// Get a bear by ID
exports.get = function(req, res) {
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err)
      res.send(err);

    res.json(bear);
  });
};

// Update a bear
exports.update = function(req, res) {
  Bear.findById(req.params.bear_id, function(err, bear) {
    if (err)
      res.send(err);

    bear.name = req.body.name; // update bear info

    bear.save(function(err) {
      if (err)
        res.send(err);

      res.json(bear);
    });
  });
};

// Delete a bear
exports.delete = function(req, res) {
  Bear.remove({
    _id: req.params.bear_id
  }, function(err, bear) {
    if (err)
      res.send(err);

    res.json({ message: 'Successfully deleted' });
  });
};
