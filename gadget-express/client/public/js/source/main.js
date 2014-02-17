(function(){

  'use strict';

  $(document).ready(initialize);

  var gadgetsArray = [];
  var usersArray = [];

  function initialize(){
    $(document).foundation();
    $('#createuser').click(addUser);
    $('#creategadget').click(addGadget);
    $('#purchasedirectory').on('click', '.purchasebutton', purchaseGadget);
    $('#purchasedirectory').on('click', '.finalbutton', finalizePurchase);
    getUsers();
    getGadgets();
  }

  function getUsers(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/users';
    var type = 'GET';
    var success = function(data){
      for(var i = 0; i < data.users.length; i++){
        addUserDom(data.users[i]);
      }
    };

    $.ajax({url:url, type:type, success:success});
  }

  function getGadgets(){
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/gadgets';
    var type = 'GET';
    var success = function(data){
      for(var j = 0; j < data.gadgets.length; j++){
        addGadgetDom(data.gadgets[j]);
      }
    };

    $.ajax({url:url, type:type, success:success});
  }

  function addUser(){
    var data = $('#inputuser').serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/users';
    var type = 'POST';
    var success = addUserDom;

    $.ajax({url:url, data:data, type:type, success:success});

    $('#username').val('');
    $('#deposit').val('');
    event.preventDefault();
  }

  function addUserDom(user){
    usersArray.push(user);

    var $tr = $('<tr>');
    $tr.attr('data-user-id', user._id);
    var $tduser = $('<td>');
    var $tdbalance = $('<td>');
    var $tdpurchases = $('<td>');

    $tduser.text(user.username);
    $tdbalance.text(user.balance);
    $tdbalance.addClass('ubalance');
    $tdpurchases.text(user.purchases.join(', '));
    $tdpurchases.addClass('upurchases');
    $tr.append($tduser, $tdbalance, $tdpurchases);

    $('#users').prepend($tr);
    $('#username').focus();
  }

  function addGadget(){
    var data = $('#inputgadget').serialize();
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/gadgets';
    var type = 'POST';
    var success = addGadgetDom;

    $.ajax({url:url, data:data, type:type, success:success});

    $('#gadget').val('');
    $('#color').val('');
    $('#cost').val('');
    $('#amount').val('');
    event.preventDefault();
  }

  function addGadgetDom(gadget){
    if(gadget.quantity === 0){
      return;
    }

    gadgetsArray.push(gadget);

    var $tr = $('<tr>');
    $tr.attr('data-gadget-id', gadget._id);
    var $tdpurchase = $('<td>');
    $tdpurchase.addClass('purchasebutton');
    var $tdbutton = $('<input>');
    $tdpurchase.append($tdbutton);
    var $tdgadget = $('<td>');
    var $tdcost = $('<td>');
    var $tdamount = $('<td>');
    var $tduserselect = $('<td>');
    var $userselect = $('<select>');
    $tduserselect.append($userselect);
    $tduserselect.addClass('clicked userselect hide');
    var $tdamountselect = $('<td>');
    var $amountselect = $('<select>');
    $tdamountselect.append($amountselect);
    $tdamountselect.addClass('clicked amountselect hide');
    var $tdfinalbutton = $('<td>');
    var $finalbutton = $('<input>');
    $tdfinalbutton.append($finalbutton);
    $tdfinalbutton.addClass('clicked finalbutton hide');

    $tdbutton.addClass('button radius tiny');
    $tdbutton.val('Purchase');
    $finalbutton.addClass('button radius tiny');
    $finalbutton.val('Final');
    $tdgadget.text(gadget.name);
    $tdcost.text(gadget.cost);
    $tdamount.text(gadget.quantity);
    $tdamount.addClass('quantity');

    $tr.append($tdpurchase, $tdgadget, $tdcost, $tdamount, $tduserselect, $tdamountselect, $tdfinalbutton);

    $('#purchasedirectory').prepend($tr);
  }

  function purchaseGadget(){
    $(this).siblings('.amountselect').children().empty();
    $(this).siblings('.userselect').children().empty();

    var purchaseId = $(this).parent().attr('data-gadget-id');
    $(this).siblings('.clicked').toggleClass('hide');

    for(var i = 0; i < usersArray.length; i++){
      $(this).siblings('.userselect').children().append('<option value="'+usersArray[i].username+'">'+usersArray[i].username+'</option>');
    }
    
    var selectedGadget = _.find(gadgetsArray, function(gadget){
      return gadget._id === purchaseId;
    });
    
    var quantityAvailable = selectedGadget.quantity;
    var amountArray = _.range(1, quantityAvailable + 1);
    
    for(var j = 0; j < amountArray.length; j++){
      $(this).siblings('.amountselect').children().append('<option value='+amountArray[j]+'>'+amountArray[j]+'</option>');
    }
  }

  function finalizePurchase(){
    var buyer = $(this).siblings('.userselect').children().val();
    var quantity = $(this).siblings('.amountselect').children().val();
    var gadgetId = $(this).parent().attr('data-gadget-id');
    var selectedGadget = _.find(gadgetsArray, function(gadget){
      return gadget._id === gadgetId;
    });
    var selectedUser = _.find(usersArray, function(user){
      return user.username === buyer;
    });
    var totalCost = quantity * selectedGadget.cost;
    var userCurrentBalance = selectedUser.balance;
    if(userCurrentBalance < totalCost){
      alert('Sorry, you do not have enough money to complete the current transaction.');
    }
    else{
      for(var i = 0; i < quantity; i++){
        selectedUser.purchases.push(selectedGadget.name);
      }
      selectedGadget.quantity = selectedGadget.quantity - quantity;
      selectedUser.balance = selectedUser.balance - totalCost;

      adjustGadgetInDb(selectedGadget);
      adjustUserInDb(selectedUser);
    }
  }

  function adjustGadgetInDb(gadget){
    var data = gadget;
    var id = gadget._id;
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/gadgets/' + id;
    var type = 'PUT';
    var success = updateGadgetInDom;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function adjustUserInDb(user){
    var data = user;
    var id = user._id;
    var url = window.location.origin.replace(/(\d){4}/g, '4000') + '/users/' + id;
    var type = 'PUT';
    var success = updateUserInDom;

    $.ajax({url:url, type:type, data:data, success:success});
  }

  function updateGadgetInDom(gadget){
    var id = gadget.gadget._id;
    var quantity = gadget.gadget.quantity;
    if(quantity === 0){
      $('#purchasedirectory tr[data-gadget-id='+id+']').remove();
    }
    else{
      $('#purchasedirectory tr[data-gadget-id='+id+']').children('.clicked').toggleClass('hide');
      $('#purchasedirectory tr[data-gadget-id='+id+']').children('.quantity').text(quantity);
    }
    if(gadget.count === 1){
      _.remove(gadgetsArray, function(gadg){
        return gadg._id === id;
      });
      gadgetsArray.push(gadget.gadget);
    }
  }

  function updateUserInDom(user){
    var id = user.user._id;
    var balance = user.user.balance;
    var purchases = user.user.purchases.join(', ');
    $('#users tr[data-user-id='+id+']').children('.ubalance').text(balance);
    $('#users tr[data-user-id='+id+']').children('.upurchases').text(purchases);
    if(user.count === 1){
      _.remove(usersArray, function(usr){
        return usr._id === id;
      });
      usersArray.push(user.user);
    }
  }

})();

