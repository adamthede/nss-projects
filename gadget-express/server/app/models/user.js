'use strict';

function User(user){
  this.username = user.username || '';
  this.balance = parseFloat(user.balance || 0);
  this.purchases = [];
}

module.exports = User;
