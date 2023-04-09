// Potential to optimise code further and clean up unnecessary lines and variable settings.

// Potential to create more functions for actions that exist within event listeners, can prevent duplication in keydown section.

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
    if (displayValue === null || displayValue == 0) {
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
    // Reassigns operator if a different one is pressed in succession
    if (operator && !operatorButton.classList.contains(`${operator.name}`)) {
      if (operatorButton.classList.contains("add")) {
        operator = add;
      } else if (operatorButton.classList.contains("subtract")) {
        operator = subtract;
      } else if (operatorButton.classList.contains("divide")) {
        operator = divide;
      } else if (operatorButton.classList.contains("multiply")) {
        operator = multiply;
      }
      return;
    }
    // Logic to evaluate pressing two operators in a row
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

      if (display.innerText !== "Impossible.") {
        display.innerText = result;
      }
      firstNum = result;
    }
    //
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
  displayValue = null;
  if (operator) {
    let result = operate(operator, firstNum, secondNum);
    result = parseFloat(result);
    // check if number too big for display & if over 5 decimals
    if (
      result.toString().split(".")[1] &&
      result.toString().split(".")[1].length > 5
    ) {
      result = parseFloat(result.toFixed(5));
    }
    if (result.toString().length > 11) {
      result = result.toExponential(4);
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
  displayValue = parseFloat(display.innerText) * -1;
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

backspace.addEventListener("click", () => {
  if (displayValue === null || displayValue.length !== 1) {
    displayValue = display.innerText.slice(0, -1);
    display.innerText = displayValue;
  } else {
    displayValue = "0";
    display.innerText = displayValue;
  }
  if (!operator) {
    firstNum = displayValue;
  } else {
    secondNum = displayValue;
  }
});

percent.addEventListener("click", () => {
  displayValue = parseFloat(display.innerText) / 100;
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

// ** Section below allows for above logic to be performed with keys ** //
window.addEventListener("keydown", e => {
  let button = document.querySelector(`.${e.code}`);
  if (button && button.classList.contains("number")) {
    if (displayValue === null || displayValue === "0") {
      displayValue = "";
    }
    if (displayValue.length === 11) {
      return;
    }
    displayValue += button.innerText;
    display.innerText = displayValue;
    if (operator === null) {
      firstNum = parseFloat(displayValue);
    } else {
      secondNum = parseFloat(displayValue);
    }
  }

  if (button && button.classList.contains("operator")) {
    displayValue = null;
    // Reassigns operator if a different one is pressed in succession
    if (operator && !button.classList.contains(`${operator.name}`)) {
      if (button.classList.contains("add")) {
        operator = add;
      } else if (button.classList.contains("subtract")) {
        operator = subtract;
      } else if (button.classList.contains("divide")) {
        operator = divide;
      } else if (button.classList.contains("multiply")) {
        operator = multiply;
      }
      return;
    }
    // Logic to evaluate pressing two operators in a row
    if (operator !== null) {
      let result = operate(operator, firstNum, secondNum);
      if (operator === divide && secondNum === 0) {
        result = NaN;
        display.innerText = "Impossible.";
      }
      // rounds numbers to 5 decimals & converts to exponential
      if (result.toString().length > 11) {
        result = result.toExponential(4);
      } else if (
        result.toString().split(".")[1] &&
        result.toString().split(".")[1].length > 5
      ) {
        result = result.toFixed(5);
      }

      if (display.innerText !== "Impossible.") {
        display.innerText = result;
      }
      firstNum = result;
    }
    //
    if (button.classList.contains("add")) {
      operator = add;
    } else if (button.classList.contains("subtract")) {
      operator = subtract;
    } else if (button.classList.contains("divide")) {
      operator = divide;
    } else if (button.classList.contains("multiply")) {
      operator = multiply;
    }
    if (operator) {
      // when operator is pressed twice in a row
      secondNum = firstNum;
    }
  }

  if (button && button.classList.contains("equals")) {
    displayValue = null;
    if (operator) {
      let result = operate(operator, firstNum, secondNum);
      result = parseFloat(result);
      // check if number too big for display & if over 5 decimals
      if (
        result.toString().split(".")[1] &&
        result.toString().split(".")[1].length > 5
      ) {
        result = parseFloat(result.toFixed(5));
      }
      if (result.toString().length > 11) {
        result = result.toExponential(4);
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
  }

  if (button && button.classList.contains("decimal")) {
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
  }
  if (button && button.classList.contains("backspace")) {
    if (displayValue.length !== 1) {
      displayValue = display.innerText.slice(0, -1);
      display.innerText = displayValue;
    } else {
      displayValue = "0";
      display.innerText = displayValue;
    }
    if (!operator) {
      firstNum = displayValue;
    } else {
      secondNum = displayValue;
    }
  }
});
