/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Paper = require('./paper.model');

exports.register = function(socket) {
  Paper.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Paper.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('paper:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('paper:remove', doc);
}