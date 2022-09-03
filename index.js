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

const displayCont = document.querySelector("#display-cont");
const buttonCont = document.querySelector("#btn-cont");
const clearCont = document.querySelector("#clear-cont");
buttonCont.addEventListener("click", buttonClick);
clearCont.addEventListener("click", reset);
let operands = [],
  operator = "",
  result = 0,
  opFlag = false;
let expr = "";
function reset(event) {
  if (event.target.type !== "submit") {
    return;
  }
  resetExpression();
  resetOperator();
  resetDisplay();
  resetOpFlag();
}
function resetExpression() {
  expr = "";
}
function resetOperator() {
  operator = "";
}
function resetDisplay() {
  displayCont.textContent = "0";
}
function resetOpFlag() {
  opFlag = false;
}
function setOperator(txt) {
  if (txt.search(/\W/) !== -1) {
    operator = txt;
  }
}

function buttonClick(event) {
  if (event.target.type !== "submit") {
    return;
  }

  if (event.target.textContent === "=") {
    calcResult();
    displayResult();
  } else {
    if (opFlag) {
      calcResult();
      resetExpression();
      modExpression(`${result}${event.target.textContent}`);
      resetOpFlag();
    } else {
      modExpression(event.target.textContent);
      setFlag(event.target.textContent);
      if (!operator) {
        setOperator(event.target.textContent);
      }
    }
  }
}

function modExpression(txt) {
  expr += txt;
  console.log(`expr : ${expr}`);
}
function setFlag(txt) {
  if (operator) {
    opFlag = true;
  }
}
function displayResult() {
  displayCont.textContent = `${result}`;
}
function calcResult() {
  parseExpression();
  switch (operator) {
    case "+":
      result = add(operands[0], operands[1]);
      break;
    case "-":
      result = subtract(operands[0], operands[1]);
      break;
    case "*":
      result = multiply(operands[0], operands[1]);
      break;
    case "/":
      result = divide(operands[0], operands[1]);
      break;
  }
}
function parseExpression() {
  operator = expr[expr.search(/\W/)];
  console.log(`operator ${operator}`);
  operands = expr.split(/\W/g).map((x) => parseFloat(x));
  console.log(`operands ${operands[0]}, ${operands[1]}`);
}
