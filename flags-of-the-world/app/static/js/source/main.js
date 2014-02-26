(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    $('#countries').on('click', '.country', setCountry);
    $('#flags').on('click', '.flag', setFlag);
    $('#match').click(match);
    start();
  }

  var timer;
  var matched = 0;
  var country;
  var flag;

  function start(){
    timer = setTimeout(gameOver, 60000);
    var i = 1;
    setInterval(function(timer){
      $('#timer').empty();
      var currentSec = 60 - i;
      if(currentSec > 0){
        var $p = $('<p>');
        $p.text(currentSec);
        $('#timer').append($p);
        i++;
      }
    }, 1000);
  }

  function match(){
    var url = '/match?country=' + country + '&flag=' + flag;
    var type = 'GET';
    var success = matchOrNotMatch;

    $.ajax({url:url, type:type, success:success});

    event.preventDefault();
  }

  function matchOrNotMatch(data){
    var f = data.flag;
    var c = data.country;
    if(f === false && c === false){
      return;
    }
    else{
      matched += 1;
      $('.chosen').addClass('eliminated');
      $('.eliminated').removeClass('chosen');
    }
    if(matched === 8){
      clearInterval(timer);
      alert('You Won!');
    }
  }

  function gameOver(){
    alert('Sorry!  Time ran out!');
  }

  function setCountry(){
    $('.country').parent().removeClass('chosen');
    if($(this).parent().hasClass('eliminated')){
      return;
    }
    else{
      country = $(this).text();
      $(this).parent().addClass('chosen');
    }
  }

  function setFlag(){
    $('.flag').parent().removeClass('chosen');
    var capture = $(this).attr('class').toString();
    if($(this).parent().hasClass('eliminated')){
      return;
    }
    else{
      $(this).parent().addClass('chosen');
      flag = capture.slice(-2);
    }
  }

})();
