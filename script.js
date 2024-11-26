
const renderDisplay = document.querySelector('.display-calculation');
let a = '';
let calculation = [];
const resetExpression = document.querySelector('.reset-expression');

function addToCalculation(num) {
  if (!isNaN(num)) {
    renderDisplay.innerHTML += num;
    a += num
  }

  if (['+', '-', '*', '/'].includes(num)) {
    if (a) {
      calculation.push(a)
      a = ''
    }
    calculation.push(num)
    renderDisplay.innerHTML += `${num}`;
  } 

  if (num === '=') {
    if (a) {
      calculation.push(a)
      renderDisplay.innerHTML += num;
    }
    try {
      const result = evaluateCalculation(calculation);
      renderDisplay.innerHTML = result;
      calculation = [];
      a = result.toString();
    } catch (error) {
        renderDisplay.innerHTML = 'Error';
        calculation = [];
        a = '';
    }
  }
}

function evaluateCalculation(calculation) {
  const expression = calculation.join(' ');
  return Function(`'use strict'; return (${expression})`)();
}

resetExpression.addEventListener('click', () => {
  a = '';
  calculation = [];
  renderDisplay.innerHTML = ''
}) 
