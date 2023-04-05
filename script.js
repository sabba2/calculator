let firstNum;
let secondNum;
let operator;
let displayValue;
const display = document.querySelector(".display");
const numberButtons = Array.from(document.querySelectorAll(".number"));

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, firstNum, secondNum) {
  return operator(firstNum, secondNum);
}

numberButtons.forEach(numberButton => {
  numberButton.addEventListener("click", () => {
    display.innerText = numberButton.innerText;
    displayValue = display.innerText;
  });
});
