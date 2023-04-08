let firstNum = null;
let secondNum = null;
let operator = null;
const display = document.querySelector(".display");
const numberButtons = Array.from(document.querySelectorAll(".number"));
const operators = Array.from(document.querySelectorAll(".operator"));
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector(".decimal");
const plusminus = document.querySelector(".plusminus");
const backspace = document.querySelector(".backspace");
const percent = document.querySelector(".percent");
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
    if (displayValue.length === 11) {
      return;
    }
    displayValue += numberButton.innerText;
    display.innerText = displayValue;
    if (operator === null) {
      firstNum = parseFloat(displayValue);
    } else {
      secondNum = parseFloat(displayValue);
    }
  });
});

operators.forEach(operatorButton => {
  operatorButton.addEventListener("click", () => {
    displayValue = null;
    if (operator !== null) {
      let result = operate(operator, firstNum, secondNum);
      if (operator === divide && secondNum === 0) {
        result = NaN;
        display.innerText = "Impossible.";
      }
      // rounds numbers to 5 decimals
      if (result.toString().length > 11) {
        result = result.toExponential(4);
      } else if (
        result.toString().split(".")[1] &&
        result.toString().split(".")[1].length > 5
      ) {
        result = result.toFixed(5);
      }
      //
      if (display.innerText !== "Impossible.") {
        display.innerText = result;
      }
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
    if (operator) {
      // when operator is pressed twice in a row
      secondNum = firstNum;
    }
  });
});

equals.addEventListener("click", () => {
  if (operator) {
    let result = operate(operator, firstNum, secondNum);
    result = parseFloat(result);
    // check if number too big for display & if over 5 decimals
    if (result.toString().length > 11) {
      result = result.toExponential(4);
    } else if (
      result.toString().split(".")[1] &&
      result.toString().split(".")[1].length > 5
    ) {
      result = result.toFixed(5);
    }

    if (operator === divide && secondNum === 0) {
      result = NaN;
      display.innerText = "Impossible.";
    }
    if (display.innerText !== "Impossible.") {
      display.innerText = result;
    }
    displayValue = result;
    operator = null;
    firstNum = parseFloat(result);
  }
});

clear.addEventListener("click", () => {
  firstNum = null;
  secondNum = null;
  operator = null;
  displayValue = null;
  display.innerText = 0;
});

decimal.addEventListener("click", () => {
  if (displayValue === null) {
    displayValue = "0";
  }
  if (displayValue.length === 11) {
    return;
  }
  // disable decimal button if there is already a decimal
  if (!displayValue.includes(".")) {
    displayValue += decimal.innerText;
    display.innerText = displayValue;
  }
});

plusminus.addEventListener("click", () => {
  // if (displayValue[0] !== "-" || displayValue === "0") {
  //   return;
  // }
  displayValue = parseFloat(display.innerText) * -1;
  console.log(displayValue);
  if (displayValue.toString().length >= 11) {
    displayValue = displayValue.toExponential(4);
    display.innerText = displayValue;
  } else {
    display.innerText = displayValue;
  }
  if (!operator) {
    firstNum = displayValue;
  } else {
    secondNum = displayValue;
  }
});

// Update to work after clicking equals
backspace.addEventListener("click", () => {
  displayValue = null;
  display.innerText = "0";
  if (!operator) {
    firstNum = 0;
  } else {
    secondNum = 0;
  }
});

percent.addEventListener("click", () => {
  displayValue = parseFloat(display.innerText) / 100;
  display.innerText = displayValue;
  if (!operator) {
    firstNum = displayValue;
  } else {
    secondNum = displayValue;
  }
});

// Allow for typing to enter numbers
