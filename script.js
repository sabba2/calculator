let firstNum;
let secondNum;
let operator;
let displayValue;
const display = document.querySelector(".display");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector(".equals");

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
  console.log(firstNum, secondNum);
  let result = operate(operator, firstNum, secondNum);
  display.innerText = result;
});
