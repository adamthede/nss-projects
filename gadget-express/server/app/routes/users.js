'use strict';

var User = require('../models/user');
var mongodb = require('mongodb');

exports.create = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  var user = new User(req.body);
  users.insert(user, function(err, users){
    res.send(users[0]);
  });
};

exports.index = function(req, res){
  var db = global.mdb;
  var users = db.collection('users');
  users.find().toArray(function(err, users){
    res.send({users: users});
  });
};

exports.updateUser = function(req, res){
  var db = global.mdb;
  var id = new mongodb.ObjectID(req.params.id);
  var username = req.body.username;
  var balance = req.body.balance;
  var purchases = req.body.purchases;
  var user = {username:username, balance:balance, purchases:purchases};
  
  db.collection('users').update({_id:id}, user, function(err, count){
    user._id = id;
    res.send({count:count, id:id, user:user});
  });
};
