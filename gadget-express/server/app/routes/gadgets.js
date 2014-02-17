'use strict';

var Gadget = require('../models/gadget');
var mongodb = require('mongodb');

exports.create = function(req, res){
  var db = global.mdb;
  var gadgets = db.collection('gadgets');
  var gadget = new Gadget(req.body);
  gadgets.insert(gadget, function(err, gadgets){
    res.send(gadgets[0]);
  });
};

exports.index = function(req, res){
  var db = global.mdb;
  var gadgets = db.collection('gadgets');
  gadgets.find().toArray(function(err, gadgets){
    res.send({gadgets: gadgets});
  });
};

exports.updateGadget = function(req, res){
  var db = global.mdb;
  var id = new mongodb.ObjectID(req.params.id);
  var gadget = new Gadget(req.body);

  db.collection('gadgets').update({_id:id}, gadget, function(err, count){
    gadget._id = id;
    res.send({count:count, id:id, gadget:gadget});
  });
};
