let num1 = "", num2 = "";
let input = "";
let operator = "";
let answer = "";
let storeInNum1 = true;
let clearDisplay = false;

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

const buttons = document.querySelectorAll("button");
const screen = document.querySelector("#screen1");
screen.textContent = `${input}`;
buttons.forEach((button) => {
   button.addEventListener("click", () => {
        inputHandler(button);
   });
});

function inputHandler(button) {
    switch(button.textContent) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            displayToScreen(button.textContent);
            storeOperands(button.textContent);
            break;
        case '+':
        case '-':
        case 'x':
        case '÷':
            displayToScreen(button.textContent);
            process(button.textContent);
            break;
    }
    
}

function displayToScreen(digit){
    if (clearDisplay) {
        screen.textContent = "";
        clearDisplay = false;
    }
    screen.textContent += `${digit}`;
}

function process(op) {
    if (num1 !== "" && num2 === "") {
        operator = op;
        storeInNum1 = false;
        // clearDisplay = true;
        console.log(operator);
    } else if (num1 !== "" && num2 !== "") {
        answer = operate(parseInt(num1), parseInt(num2), operator);
        screen.textContent = "";
        displayToScreen(answer);
        storeInNum1 = true;
        operator = "";
        clearDisplay = true;
    }
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