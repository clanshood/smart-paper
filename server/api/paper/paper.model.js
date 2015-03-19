'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaperSchema = new Schema({
  title: String,
  description: String,
  type: {
    type: String,
    default: 'public'
  }, // public or private (jika private, hanya collaborator yang bisa melihat paper ini)
  questions: [{ fill: [{ question: { type: Schema.Types.ObjectId, ref: 'Question'}}] }],
  status: {
    type: String,
    default: 'active'
  }, // (trash, archive, active, etc)
  badge: Array, // (digunakan untuk penanda kelas)
  label: Array, // (digunakan untuk penanda mata pelajaran)
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  collaborators: [{ person: [{ author: { type: Schema.Types.ObjectId, ref: 'User'}}] }],
  passingRate: {
    type: Number,
    default: 60 // in percent
  },
  timer: {
    type: Boolean,
    default: false
  },
  timeLimit: {
    type: String,
    default: 60 // in minutes
  },
  randomization: {
    type: String,
    default: 'none' // none. by group, by type
  },
  submitions: {
    type: String,
    default: 'all' // one or all
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paper', PaperSchema);