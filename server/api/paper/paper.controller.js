'use strict';

var _ = require('lodash');
var Paper = require('./paper.model');

// Get list of papers
exports.index = function(req, res) {
  Paper.find({ status: 'active' }, function (err, papers) {
    if(err) { return handleError(res, err); }
    // sort by updated date
    papers.sort(function(a, b) {
      a = new Date(a.updated);
      b = new Date(b.updated);
      return a>b ? -1 : a<b ? 1 : 0;
    });
    return res.json(200, papers);
  })
  .populate("author", "name")
  .populate("collaborators.person.author", "name");
};

// Get a single paper
exports.show = function(req, res) {
  Paper.findById(req.params.id, function (err, paper) {
    if(err) { return handleError(res, err); }
    if(!paper) { return res.send(404); }
    return res.json(paper);
  })
  .populate("author", "name")
  .populate("collaborators.person.author", "name");
};

// Creates a new paper in the DB.
exports.create = function(req, res) {
  Paper.create(req.body, function(err, paper) {
    if(err) { return handleError(res, err); }
    return res.json(201, paper);
  });
};

// Updates an existing paper in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Paper.findById(req.params.id, function (err, paper) {
    if (err) { return handleError(res, err); }
    if(!paper) { return res.send(404); }
    var updated = _.merge(paper, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, paper);
    });
  })
  .populate("author", "name")
  .populate("collaborators.person.author", "name");
};

// Deletes a paper from the DB.
exports.destroy = function(req, res) {
  Paper.findById(req.params.id, function (err, paper) {
    if(err) { return handleError(res, err); }
    if(!paper) { return res.send(404); }
    paper.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}