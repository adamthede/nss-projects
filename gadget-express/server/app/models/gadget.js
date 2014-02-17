'use strict';

function Gadget(gadget){
  this.name = gadget.name || '';
  this.color = gadget.color || '';
  this.cost = parseFloat(gadget.cost || 0);
  this.quantity = parseInt(gadget.quantity || 0);
}

module.exports = Gadget;
