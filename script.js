let sum = 0;
const add = function (...theArgs) {
  for (let arg of theArgs) {
    sum += arg;
  }
  return sum;
};

const subtract = function (...theArgs) {
  for (let arg of theArgs) {
    sum -= arg;
  }
  return sum;
};

const multiply = function (...theArgs) {
  for (let arg of theArgs) {
    sum *= arg;
  }
  return sum;
};
