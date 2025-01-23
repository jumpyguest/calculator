let num1 = "", num2 = "";
let operator = "";
// let answer = "";
let storeInNum1 = true;
let clearDisplay = true;
const numBtns = document.querySelectorAll(".digit");
const opBtns = document.querySelectorAll(".op");
const equalsBtn = document.querySelector("#equalsBtn");
const acBtn = document.querySelector("#AC");
const screen = document.querySelector("#screen1");

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
    if (num1 !== '' && num2 !== '') {
        // getAnswer();
        displayToScreen(getAnswer());
    }
});

acBtn.addEventListener("click", () => {
    clearAll();
});


/** Event handlers */

function digitHandler(e) {
    displayToScreen(e.target.textContent);
    storeOperands(e.target.textContent);
}

function opHandler(e) {
    // processOp(e.target.textContent);
    // displayToScreen(processOp(e.target.textContent) + e.target.textContent);
    displayToScreen(processOp(e.target.textContent));
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
    // let ans = "";
    if (num1 !== "" && num2 === "") {
        storeInNum1 = false;
        clearDisplay = true;
    } else if (num1 !== "" && num2 !== "") {
        getAnswer();
        // displayToScreen(`${answer}`);
    }
    operator = op;
    console.log(operator);
    return num1 + operator;
}

function storeOperands(digit) {
    if (storeInNum1 === true) {
        num1 += digit;
        console.log(`num1:${num1}`);
    } else {
        num2 += digit;
        console.log(`num2:${num2}`);
    }
}

function getAnswer() {
    // answer = operate(parseInt(num1), parseInt(num2), operator);
    num1 = operate(parseInt(num1), parseInt(num2), operator).toString();
    num2 = "";
    // operator = "";
    screen.textContent = "";
    return num1;
}

function clearAll() {
    num1 = "";
    num2 = "";
    storeInNum1 = true;
    operator = "";
    screen.textContent = "0";
    clearDisplay = true;
}