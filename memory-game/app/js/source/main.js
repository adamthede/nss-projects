(function(){
  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $('#play').click(makeBoard);
    $('.card').click(showGuess);
  }

  var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  var gameSpace = [0,0,0,0,0,0,0,0,0,0];
  var turn;
  var board = [[],[],[],[],[]];
  var pick1;
  var pick2;
  var place1;
  var place2;

  function cardBoard(){
    var boardSpace = [0,0,0,0,0,0,0,0,0,0];

    for(var i = 0; i < 10; i++){
      var position = Math.floor(Math.random()*(boardSpace.length-i));
      boardSpace[i] = alphabet.slice(position, position+1);
      alphabet.splice(position, 1);
    }

    boardSpace = boardSpace.toString().split(',');
    var wholeBoard = boardSpace.concat(boardSpace);
    var newBoard = [];

    for(var z = 0; z < 20; z++){
      var select = Math.floor(Math.random()*2+1);
      if(select === 1){
        newBoard.push(wholeBoard[z]);
      }
      else if(select === 2){
        newBoard.unshift(wholeBoard[z]);
      }
    }
    return newBoard;
  }

  function makeBoard(){
    gameSpace = cardBoard(alphabet);
    assignBoard(gameSpace);
    turn = 0;
  }

  function assignBoard(){
    var countdown = 0;
    
    for(var i = 0; i < 4; i++){
      for(var j = 0; j < 5; j++){
        //var place = (Math.floor(Math.random()*(20-countdown)));
        var pick = gameSpace[countdown];
        board[i][j] = pick;
        //gameSpace = gameSpace.replace(pick, '');
        countdown++;
      }
    }
  }

  function showGuess(){
    var thisRow = $(this).parent().index();
    var thisCol = $(this).index();

    if(turn === 0){
      place1[0] = thisRow;
      place1[1] = thisCol;
      pick1 = board[thisRow][thisCol];
      $(this).children().text(pick1);
      turn = 1;
    }
    else if(turn === 1){
      if(place1[0] === thisRow && place1[1] === thisCol){
        return;
      }
      place2[0] = thisRow;
      place2[1] = thisCol;
      pick2 = board[thisRow][thisCol];
      $(this).children().text(pick2);
      checkCards();
    }
    if(turn === 2){
      resetTurn();
    }
  }

  function checkCards(){
    if(pick1 === pick2){
      place1 = [];
      place2 = [];
      turn = 0;
    }
    else{
      turn = 2;
    }
  }

  function resetTurn(){
    var row = place1[0] + 1;
    var column = place1[1] + 1;
    var place = board[row][column];
    place.text('');

    row = place2[0] + 1;
    column = place2[1] + 1;
    place = board[row][column];
    place.text('');

    place1 = [];
    place2 = [];

    turn = 0;
  }

})();
