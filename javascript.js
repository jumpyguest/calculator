let num1 = "", num2 = "";
let operator = "";
let storeInNum1 = true;
let clearDisplay = true;
let signedNum1 = false;
let signedNum2 = false;
const numBtns = document.querySelectorAll(".digit");
const opBtns = document.querySelectorAll(".op");
const equalsBtn = document.querySelector("#equalsBtn");
const acBtn = document.querySelector("#AC");
const percentBtn = document.querySelector("#percent");
const delBtn = document.querySelector("#delete");
const pointBtn = document.querySelector("#point");
const signBtn = document.querySelector("#sign");
const allBtns = document.querySelectorAll("button");
const screen = document.querySelector("#screen1");

function add(a, b) {
    return +a + +b;
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

function operate(a, b, op) {
    switch(op) {
        case '+':
            return add(a, b);
            break;
        case '-':
            return subtract(a, b);
            break;
        case 'x':
            return multiply(a, b);
            break;
        case '÷':
            return divide(a, b);
            break;
        default:
            break;
    }
}

/** Event listeners */

allBtns.forEach((button) => {
    button.addEventListener("mouseover", () => button.style.opacity = "0.8");
    button.addEventListener("mouseout", () => button.style.opacity = "1");
});

numBtns.forEach((button) => {
    button.addEventListener("click", () => digitHandler(button.textContent));
});

opBtns.forEach((button) => {
    button.addEventListener("click", () => opHandler(button.textContent));
});

equalsBtn.addEventListener("click", equalsHandler);
acBtn.addEventListener("click", clearAll);
percentBtn.addEventListener("click", percentHandler);
delBtn.addEventListener("click", deleteHandler);
pointBtn.addEventListener("click", pointHandler);
signBtn.addEventListener("click", signHandler);

/** Event handlers */

function digitHandler(e) {
    storeOperands(e);
    displayToScreen();
}

function opHandler(e) {
    processOp(e);
    displayToScreen();
}

function equalsHandler() {
    if (num1 !== '' && num2 !== '') {
        getAnswer();
        displayToScreen();
    }
}

function percentHandler() {
    clearDisplay = true;
    if (storeInNum1 || operator === "") {
        num1 /= 100;
        displayToScreen();
    } else if (operator !== "" && num2 !== "") {
        num2 /= 100;
        displayToScreen()
    }
}

function deleteHandler() {
    clearDisplay = true;
    if (storeInNum1) {
        if ((num1.toString().length == 1) || (num1.toString().length == 2) && (signedNum1)) {
            signedNum1 = signedNum1 && false;
            num1 = "";
            displayToScreen();
            clearDisplay = true;
        } else {
            num1 = num1.toString().slice(0, -1);
            displayToScreen();
        }
    } else if (num2 === "" && operator !== "") {
        operator = "";
        displayToScreen();
        storeInNum1 = true;
    } else {
        if ((num2.toString().length == 2) && (signedNum2)) {
            signedNum2 = signedNum2 && false;
            num2 = "";
        } else {
            num2 = num2.toString().slice(0, -1);
        }
        displayToScreen()
    }
}

function pointHandler() {
    if ((storeInNum1 && num1.indexOf(".") === -1) || (!storeInNum1 && num2.indexOf(".") === -1)) {
        storeOperands(".");
        displayToScreen();
    } 
}

function signHandler() {
    if (operator === "" && storeInNum1 && num1 !== "") {
        if (!signedNum1) {
            signedNum1 = true;
            num1 = `-${num1}`;
            clearDisplay = true;
            displayToScreen();
        } else {
            signedNum1 = false;
            num1 = num1 * (-1);
            clearDisplay = true;
            displayToScreen();
        }
    } else if (num2 !== "") { 
        if (!signedNum2) {
                signedNum2 = true;
                num2 = `-${num2}`;
                clearDisplay = true;
                displayToScreen();
        } else {
                signedNum2 = false;
                num2 = num2 * (-1);
                clearDisplay = true;
                displayToScreen();
        }
    }
}

/** Utility functions */

function displayToScreen() {
    let displayNum1 = signedNum1 ? `(${num1})` : num1;
    let displayNum2 = signedNum2 ? `(${num2})`: num2;

    if (clearDisplay) {
        screen.textContent = "";
        clearDisplay = false;
    }
    if (num1 === "") {
        screen.textContent = 0;
    } else if (num1 === Infinity) {
        num1 = "";
        storeInNum1 = true;
        screen.textContent = "why?";
    } else {
        screen.textContent = displayNum1 + operator + displayNum2;
    }
}

function processOp(op) {
    if (num1 !== "" && num2 === "") {
        storeInNum1 = false;
        clearDisplay = true;
    } else if (num1 !== "" && num2 !== "") {
        getAnswer();
    } else {
        return;
    }
    operator = op;
}

function storeOperands(digit) {
    /** This if-condition is met when user presses a digit after pressing equals button */
    if (operator === "" && storeInNum1 === false) {
        clearDisplay = true;
        storeInNum1 = true;
        num1 = "";
    }

    if (storeInNum1) {
        num1 += digit;
    } else {
        num2 += digit;
    }
}

function getAnswer() {
    if (num1 === ".") {
        num1 = 0;
    }
    if (num2 === ".") {
        num2 = 0;
    }
    num1 = +parseFloat(operate(num1, num2, operator).toFixed(11)).toString();
    initializeNum2();
}

function clearAll() {
    num1 = "";
    initializeNum2();
    storeInNum1 = true;
    screen.textContent = "0";
}

function initializeNum2() {
    num2 = "";
    operator = "";
    clearDisplay = true;
    signedNum1 = false;
    signedNum2 = false;
}