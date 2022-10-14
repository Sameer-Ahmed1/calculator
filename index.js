function add(oprnd1Num, oprnd2Num) {
  return oprnd1Num + oprnd2Num;
}
function subtract(oprnd1Num, oprnd2Num) {
  return oprnd1Num - oprnd2Num;
}
function multiply(oprnd1Num, oprnd2Num) {
  return oprnd1Num * oprnd2Num;
}
function divide(oprnd1Num, oprnd2Num) {
  return oprnd1Num / oprnd2Num;
}
function mod(oprnd1Num, oprnd2Num) {
  return oprnd1Num % oprnd2Num;
}
function round(num, n) {
  const multiplier = Math.pow(10, n);
  return Math.round(num * multiplier) / multiplier;
}
function eraseLastChar(str) {
  return str.slice(0, str.length - 1);
}
function getLastChar(str) {
  return str.slice(str.length - 1);
}

(() => {
  const btnCont = document.querySelector("#btn-cont");
  const rsltDsply = document.querySelector("#result-cont");
  const oprtnDsply = document.querySelector("#operation-cont");

  function resetOprtnDsply() {
    oprtnDsply.textContent = "0";
    algebraicExpr = "";
  }
  function resetRsltDsply() {
    rsltDsply.textContent = "";
  }
  let oprnd1 = "",
    oprnd2 = "",
    oprtr = "",
    algebraicExpr = "",
    divByZeroFlag = false,
    oprtrDeletedFlag = false,
    result = 0;
  function setOprnd1(value) {
    oprnd1 = value;
  }
  function updateOprnd1(value) {
    oprnd1 += value;
  }
  function setOprnd2(value) {
    oprnd2 = value;
  }
  function updateOprnd2(value) {
    oprnd2 += value;
  }
  function setOprtr(value) {
    oprtr = value;
  }
  function setAlgbrcExpr(value) {
    algebraicExpr = value;
  }
  function setDivByZeroFlag(value) {
    divByZeroFlag = value;
  }
  function setOprtrDeletedFlag(value) {
    oprtrDeletedFlag = value;
  }
  function setResult(value) {
    result = value;
  }
  function roundResult() {
    result = round(result, 3);
  }
  function resetOprnd1() {
    oprnd1 = "";
  }
  function resetOprnd2() {
    oprnd2 = "";
  }
  function resetOprtr() {
    oprtr = "";
  }
  function resetAlgbrcExpr() {
    algebraicExpr = "";
  }
  function resetDivByZeroFlag() {
    divByZeroFlag = false;
  }
  function resetOprtrDeletedFlag() {
    oprtrDeletedFlag = false;
  }
  function resetResult() {
    result = 0;
  }
  function updateAlgbrcExpr(value) {
    if (value) {
      if (
        getLastChar(algebraicExpr).search(/[+/*%-]/) != -1 &&
        value.search(/[+/*%-]/) != -1
      ) {
        algebraicExpr = eraseLastChar(algebraicExpr);
        algebraicExpr += value;
      } else {
        algebraicExpr += value;
      }
    } else {
      algebraicExpr = algebraicExpr.slice(0, algebraicExpr.length - 1);
    }
  }
  function showOperation() {
    if (algebraicExpr) {
      oprtnDsply.textContent = algebraicExpr;
    } else {
      oprtnDsply.textContent = "0";
    }
  }

  btnCont.addEventListener("click", buttonClicked);
  function buttonClicked(e) {
    if (e.target.type !== "submit") {
      return;
    }
    switch (e.target.classList.value) {
      case "operator":
        operatorHandler(e.target.id);
        break;
      case "digit":
        digitHandler(e.target.id);
        break;
      case "calcFunction":
        calcfunctionHandler(e.target.id);
        break;
      case "sign":
        signHandler(e.target.id);
        break;
      case "dot":
        dotHandler(e.target.id);
        break;
    }
    showOperation();
    calcResult();
    showResult();
  }

  function operatorHandler(oprtrId) {
    if (oprnd1) {
      setOprtr(oprtrId);
      resetOprnd2();
      resetOprtrDeletedFlag();
      setOprnd1(`${result}`);
      updateAlgbrcExpr(oprtrId);
    }
  }

  function digitHandler(digitId) {
    if (oprtr) {
      updateOprnd2(digitId);
    } else {
      updateOprnd1(digitId);
    }
    updateAlgbrcExpr(digitId);
  }
  function calcfunctionHandler(functionId) {
    switch (functionId) {
      case "clear":
        resetState();
        break;
      case "=":
        calcResult();
        resetAlgbrcExpr();
        updateAlgbrcExpr(`${result}`);
        break;
      case "backspace":
        eraseLastInput();
        break;
    }
  }
  function signHandler(signId) {
    if (oprtr) {
      if (!oprnd2) {
        updateOprnd2("-");
        updateAlgbrcExpr("-");
      }
    } else {
      if (!oprnd1) {
        updateOprnd1("-");
        updateAlgbrcExpr("-");
      }
    }
  }
  function dotHandler(dotId) {
    if (oprtr) {
      if (oprnd2.search(/[.]/) == -1) {
        updateOprnd2(".");
        updateAlgbrcExpr(".");
      }
    } else {
      if (oprnd1.search(/[.]/) == -1) {
        updateOprnd1(".");
        updateAlgbrcExpr(".");
      }
    }
  }

  function calcResult() {
    let oprnd1Num = parseFloat(oprnd1);
    let oprnd2Num = parseFloat(oprnd2);

    if (isNaN(oprnd1Num)) {
      resetResult();
      return;
    }
    if (isNaN(oprnd2Num)) {
      setResult(oprnd1Num);
      return;
    }
    switch (oprtr) {
      case "+":
        setResult(add(oprnd1Num, oprnd2Num));
        break;
      case "-":
        setResult(subtract(oprnd1Num, oprnd2Num));
        break;
      case "*":
        setResult(multiply(oprnd1Num, oprnd2Num));
        break;
      case "/":
        if (oprnd2Num) {
          setResult(divide(oprnd1Num, oprnd2Num));
        } else {
          setDivByZeroFlag(true);
        }
        break;
      case "%":
        setResult(mod(oprnd1Num, oprnd2Num));
        break;
    }
    roundResult();
  }

  function resetState() {
    resetOprnd1();
    resetOprnd2();
    resetOprtr();
    resetOprtnDsply();
    resetRsltDsply();
    resetResult();
    resetAlgbrcExpr();
    resetDivByZeroFlag();
    resetOprtrDeletedFlag();
  }

  function showResult() {
    if (divByZeroFlag) {
      rsltDsply.textContent = "Error! cannot divide by zero ";
      resetDivByZeroFlag();
    } else {
      rsltDsply.textContent = `= ${result}`;
    }
  }
  function eraseLastInput() {
    if (getLastChar(algebraicExpr).search(/[+*/%-]/) != -1) {
      if (oprnd1 == "-") {
        setOprnd1(eraseLastChar(oprnd1));
        return;
      } else if (oprnd2 == "-") {
        setOprnd2(eraseLastChar(oprnd2));
        return;
      }
      window.alert("You can only erase an operand.");
    } else {
      if (oprtr) {
        setOprnd2(eraseLastChar(oprnd2));
        updateAlgbrcExpr();
      } else {
        setOprnd1(eraseLastChar(oprnd1));
        updateAlgbrcExpr();
      }
    }
  }
})();
