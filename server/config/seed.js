/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Paper = require('../api/paper/paper.model');

// User.find({}).remove(function() {
//   User.create({
//     provider: 'local',
//     name: 'Test User',
//     username: 'test',
//     email: 'test@test.com',
//     password: 'test'
//   }, {
//     provider: 'local',
//     role: 'admin',
//     name: 'Admin',
//     username: 'admin',
//     email: 'admin@admin.com',
//     password: 'admin'
//   }, function() {
//       console.log('finished populating users');
//     }
//   );
// });

Paper.find({}).remove(function() {
  Paper.create({
    title: "Didn't need no welfare states",
    description: "Everybody pulled his weight. Gee our old Lasalle ran great. Those were the days.",
    questions: [{
      fill: [
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" }
      ]
    }],
    badge: ["XI IIA 2"],
    label: ["ipa", "matematika"],
    author: "550943f5dea7f984072407e0",
    collaborators: [{
      person: [{ author: "550943f5dea7f984072407e0"},
        { author: "550943f5dea7f984072407df"}]
    }]
  },{
    title: "Those were the days",
    description: "Didn't need no welfare states. Gee our old Lasalle ran great. Those were the days.",
    questions: [{
      fill: [
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" }
      ]
    }],
    badge: ["XI IIA 2", "XI IIS 4"],
    label: ["ipa", "matematika"],
    author: "550943f5dea7f984072407e0",
    collaborators: [{
      person: [{ author: "550943f5dea7f984072407e0"},
        { author: "550943f5dea7f984072407df"}]
    }]
  },{
    title: "Gee our old Lasalle ran great",
    description: "Didn't need no welfare states. Gee our old Lasalle ran great. Those were the days.",
    questions: [{
      fill: [
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" },
        { question : "550943f5dea7f984072407df" }
      ]
    }],
    badge: ["XI IIA 2"],
    label: ["ipa", "matematika"],
    author: "550943f5dea7f984072407e0",
    collaborators: [{
      person: [{ author: "550943f5dea7f984072407e0"},
        { author: "550943f5dea7f984072407df"}]
    }]
  },
  function() {
      console.log('finished populating paper');
    }
  );
});