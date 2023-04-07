let firstNum = null;
let secondNum = null;
let operator = null;
const display = document.querySelector(".display");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
let displayValue = null;

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
    if (displayValue === null || displayValue === "0") {
      displayValue = "";
    }
    displayValue += numberButton.innerText;
    display.innerText = displayValue;

    if (operator === null) {
      firstNum = parseInt(displayValue);
    } else {
      secondNum = parseInt(displayValue);
    }
  });
});

operators.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    displayValue = null;
    if (operator !== null) {
      let result = operate(operator, firstNum, secondNum);
      if (
        result.toString().split(".")[1] &&
        result.toString().split(".")[1].length > 5
      ) {
        result = result.toFixed(5);
      }
      display.innerText = result;
      firstNum = result;
    }
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
  let result = operate(operator, firstNum, secondNum);
  // check if over 5 decimals
  if (
    result.toString().split(".")[1] &&
    result.toString().split(".")[1].length > 5
  ) {
    result = result.toFixed(5);
  }
  display.innerText = result;
});

clear.addEventListener("click", () => {
  firstNum = null;
  secondNum = null;
  operator = null;
  displayValue = null;
  display.innerText = 0;
});
