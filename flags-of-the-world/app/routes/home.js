'use strict';

var _ = require('lodash');

exports.index = function(req, res){
  var flags = _.sample(global.flags, 8);
  var countries = _.sample(flags, 8);
  res.render('home/index', {flags:flags, countries:countries, title: 'Flags of the World'});
};

exports.match = function(req, res){
  var country = req.query.country.toString();
  var flag = req.query.flag.toString();
  var match = _.find(global.flags, function(e){
    return e.country === country;
  });
  if(match.flag === flag){
    res.send({country:country, flag:flag});
  }
  else{
    res.send({country:false, flag:false});
  }
};

