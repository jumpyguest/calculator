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

signBtn.addEventListener("click", () => {
    signHandler();
});

/** Event handlers */

function digitHandler(e) {
    storeOperands(e.target.textContent);
    displayToScreen();
}

function opHandler(e) {
    processOp(e.target.textContent);
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
        if (num1.toString().length == 1) {
            num1 = "";
            displayToScreen();
            clearDisplay = true;
        } else {
            num1 = num1.toString().slice(0, -1);
            displayToScreen();
        }
        console.log(`num1:${num1}`);
    } else if (num2 === "" && operator !== "") {
        operator = "";
        displayToScreen();
        storeInNum1 = true;
    } else {
        num2 = num2.toString().slice(0, -1);
        displayToScreen()
        console.log(`num2:${num2}`);
    }
}

function pointHandler() {
    if ((storeInNum1 && num1.indexOf(".") === -1) || (!storeInNum1 && num2.indexOf(".") === -1)) {
        storeOperands(".");
        displayToScreen();
    } 
}

function signHandler() {
    if (operator === "" && storeInNum1) {
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
    let displayNum1 = num1;
    let displayNum2 = num2;
    if (signedNum1) {
        displayNum1 = `(${num1})`;
    }
    if (signedNum2) {
        displayNum2 = `(${num2})`;
    }

    if (clearDisplay) {
        screen.textContent = "";
        clearDisplay = false;
    }
    if (num1 === "") {
        screen.textContent = 0;
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
    }
    operator = op;
    console.log(operator);
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
        console.log(`num1:${num1}`);
    } else {
        num2 += digit;
        console.log(`num2:${num2}`);
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
    num2 = "";
    operator = "";
    clearDisplay = true;
    signedNum1 = false;
    signedNum2 = false;
}

function clearAll() {
    num1 = "";
    num2 = "";
    storeInNum1 = true;
    operator = "";
    screen.textContent = "0";
    clearDisplay = true;
    signedNum1 = false;
    signedNum2 = false;
}