let firstNum;
let secondNum;
let operator;
let displayValue;
const display = document.querySelector(".display");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");

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

operators.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    firstNum = parseInt(displayValue);
    if (operatorButton.classList.contains("add")) {
      operator = add;
    } else if (operatorButton.classList.contains("subtract")) {
      operator = subtract;
    } else if (operatorButton.classList.contains("divide")) {
      operator = divide;
    } else if (operatorButton.classList.contains("multiply")) {
      operator = multiply;
    }
  });
});

equals.addEventListener("click", () => {
  secondNum = parseInt(display.innerText);
  let result = operate(operator, firstNum, secondNum);
  display.innerText = result;
});

clear.addEventListener("click", () => {
  firstNum = 0;
  secondNum = 0;
  operator = null;
  displayValue = 0;
  display.innerText = 0;
});
