let num1 = "", num2 = "";
let operator = "";
let storeInNum1 = true;
let clearDisplay = true;
const numBtns = document.querySelectorAll(".digit");
const opBtns = document.querySelectorAll(".op");
const equalsBtn = document.querySelector("#equalsBtn");
const acBtn = document.querySelector("#AC");
const percentBtn = document.querySelector("#percent");
const screen = document.querySelector("#screen1");
const delBtn = document.querySelector("#delete");
const pointBtn = document.querySelector("#point");

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

numBtns.forEach((button) => {
    button.addEventListener("click", function(e) {
        digitHandler(e);
    });
});

opBtns.forEach((button) => {
    button.addEventListener("click", function(e) {
        opHandler(e);
    })
});

equalsBtn.addEventListener("click", () => {
    equalsHandler();
});

acBtn.addEventListener("click", () => {
    clearAll();
});

percentBtn.addEventListener("click", () => {
    percentHandler();
});

delBtn.addEventListener("click", () => {
    deleteHandler();
});

pointBtn.addEventListener("click", () => {
    pointHandler();
});

/** Event handlers */

function digitHandler(e) {
    storeOperands(e.target.textContent);
    displayToScreen(e.target.textContent);
}

function opHandler(e) {
    processOp(e.target.textContent);
    displayToScreen(num1 + e.target.textContent);
}

function equalsHandler() {
    if (num1 !== '' && num2 !== '') {
        getAnswer();
        displayToScreen(num1);
    }
}

function percentHandler() {
    clearDisplay = true;
    if (storeInNum1 || operator === "") {
        num1 /= 100;
        displayToScreen(num1);
    } else if (operator !== "") {
        num2 /= 100;
        displayToScreen(num1 + operator + num2)
    }
}

function deleteHandler() {
    clearDisplay = true;
    if (storeInNum1) {
        if (num1.toString().length === 1) {
            num1 = "";
            displayToScreen(0);
            clearDisplay = true;
        } else {
            num1 = num1.toString().slice(0, -1);
            displayToScreen(num1);
        }
        console.log(`num1:${num1}`);
    } else if (num2 === "" && operator !== "") {
        displayToScreen(num1);
        operator = "";
        storeInNum1 = true;
    } else {
        num2 = num2.toString().slice(0, -1);
        displayToScreen(num1 + operator + num2)
        console.log(`num2:${num2}`);
    }
}

function pointHandler() {
    if ((storeInNum1 && num1.indexOf(".") === -1) || (!storeInNum1 && num2.indexOf(".") === -1)) {
        storeOperands(".");
        displayToScreen(".");
    } 
}

/** Utility functions */

function displayToScreen(number){
    if (clearDisplay) {
        screen.textContent = "";
        clearDisplay = false;
    }
    
    screen.textContent += `${number}`;
}

function processOp(op) {
    if (num1 !== "" && num2 === "") {
        storeInNum1 = false;
        clearDisplay = true;
    } else if (num1 !== "" && num2 !== "") {
        getAnswer();
    }
    operator = op;
    console.log(operator);
}

function storeOperands(digit) {
    if (operator === "" && storeInNum1 === false) {
        clearDisplay = true;
        storeInNum1 = true;
        num1 = "";
    }

    if (storeInNum1) {
        num1 += digit;
        console.log(`num1:${num1}`);
    } else {
        num2 += digit;
        console.log(`num2:${num2}`);
    }
}

function getAnswer() {
    num1 = +parseFloat(operate(num1, num2, operator).toFixed(11)).toString();
    num2 = "";
    operator = "";
    clearDisplay = true;
}

function clearAll() {
    num1 = "";
    num2 = "";
    storeInNum1 = true;
    operator = "";
    screen.textContent = "0";
    clearDisplay = true;
}