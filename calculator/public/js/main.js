console.log('welcome to your calc app');

var operator = prompt('Add (+), Subtract (-), Multiply (*), Divide(/), Power (p), Factorial (f), or Quit (q)?');

while(operator != 'q'){

  console.log(operator);

  var x = prompt('Please input your first number:');
  var y = prompt('Please input your second number:');
  console.log(x);
  console.log(y);
  x = parseFloat(x);
  y = parseFloat(y);

  var result;

  if(operator === "+" || operator === "Add" || operator === "add")
    result = add(x,y);
  else if(operator === "-" || operator === "Subtract" || operator === "subtract")
    result = subtract(x,y);
  else if(operator === "*" || operator === "Multiply" || operator === "multiply")
    result = multiply(x,y);
  else if(operator === "f")
    result = factorial(x);
  else if(operator === "p")
    result = power(x,y);
  else
    result = divide(x,y);

  console.log(result);
  
  operator = prompt('Add (+), Subtract (-), Multiply (*), Divide (/), Power (p), Factorial (f), or Quit (q)?');
}

console.log('Thanks for visiting!');

/*
switch(operator){
  case '+':
      result = add(x,y);
      break;
  case '-':
      result = subtract(x,y);
      break;
  case '*':
      result = multiply(x,y);
      break;
  case '/':
      result = divide(x,y);
}
*/

// ----------------------------------------- //

function multiply(a,b){
  return a*b;
}

function divide(a,b){
  return a/b;
}

function add(a,b) {
  return a+b;
}

function subtract(a,b) {
  return a-b;
}

function power(base, exp) {
  var result = 1;
  for(var i = 0; i < exp; i++)
    result = result * base;
  return result;
}

function factorial(a) {
  var result = a;
  for(var i = 1; i < a; i++)
    result = result * (a - i);
  return result;
}
