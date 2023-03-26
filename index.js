// QUERY SELECTION //

const input = document.querySelector("#input");
const output = document.querySelector("#output");

const buttons = document.querySelectorAll(".btn");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");


// DEFINE VARIABLES //

let numberOne = "";
let operatorValue = "";
let numberTwo = "";
let result = "";


// BASIC FUNCTIONS //

function add(a, b) {
    return a + b;
}; // addition

function subtract(a, b) {
    return a - b;
}; // subtraction

function multiply(a, b) {
    return a * b;
}; // multiplication

function divide(a, b) {
    return a / b;
}; // division

function power(a, b) {
    return a ** b;
}; // power


// OPERATION //

function operate(a, operator, b) {
    // HOW THIS WORKS:
    // 1. Convert inputs into number formats.
    // 2. Checks the operator value, with each case calls the corresponding functions and returns the result.
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            if (b === 0) return null;
            return divide(a, b);
        case "^":
            return power(a, b);
    };
};


// RESET FUNCTION //

function clearAll() {
    input.textContent = "0";
    output.textContent = "";
    numberOne = "";
    operatorValue = "";
    numberTwo = "";
};


// OUTPUT CALCULATION //

function calculate() {
    // HOW THIS WORKS:
    // 1. Operate with the existing numbers and operator value.
    // 2. Returns the result to the output text content.
    // 3. Let number one equals the result for future calculations.
    // 4. Let number two equals number one temporarily for future calculations.
    result = operate(numberOne, operatorValue, numberTwo);
    output.textContent = result;
    numberOne = result;
    numberTwo = numberOne;
};


// BUTTON EVENT LISTENERS //

buttons.forEach(button => button.addEventListener("click", () => {
    // HOW THIS WORKS:
    // 1. Checks the button ID:
    //  - If the button has the ID of all-clear, reset input to 0 and clear all existing data.
    //  - If the button has the ID of clear, checks the last character to decide which to remove,
    //    then take out the last character from input.
    //  - If the button has the ID of equal, do not add anything to the input.
    //  - For other cases, move to step 2.
    // 2. Checks the text content in the input.
    //  - If it is 0, delete it after the user clicked a button.
    //  - For other cases, move to step 3.
    // 3. Checks the last character of the input.
    //  - If it is an operator, checks the button that the user has clicked.
    //      + If it is an operator or an equal button, do nothing.
    //      + For other cases, add the button text content to the input and update the number two variable.
    switch (button.id) {
        case "all-clear":
            clearAll();
            break;
        case "clear":
            switch (input.textContent.charAt(input.textContent.length - 1)) {
                case "+":
                case "-":
                case "×":
                case "÷":
                case "^":
                    break;
                default:
                    numberTwo = numberTwo.slice(0, -1);
            }
            input.textContent = input.textContent.slice(0, -1);
            break;
        case "equal":
            input.textContent += "";
            break;
        default:
            switch (input.textContent) {
                case "0":
                    input.textContent = button.textContent;
                    numberTwo += button.textContent;
                    break;
                default:
                    switch (input.textContent.charAt(input.textContent.length - 1)) {
                        case "+":
                        case "-":
                        case "×":
                        case "÷":
                        case "^":
                            switch (button.textContent) {
                                case "+":
                                case "-":
                                case "×":
                                case "÷":
                                case "^":
                                    input.textContent += "";
                                    break;
                                default:
                                    input.textContent += button.textContent;
                                    numberTwo += button.textContent;
                            }
                            break;
                        default:
                            switch (button.textContent) {
                                case "=":
                                    input.textContent += "";
                                    break;
                                default:
                                    input.textContent += button.textContent;
                                    numberTwo += button.textContent;
                            };
                    };
            };
    };
})); // every button

operators.forEach(operator => operator.addEventListener("click", () => {
    // HOW THIS WORKS:
    // 1. If the operator value is empty, reverse the two number values using "result" as a temporaray variable,
    // slice out the excess operator from number one and update the operator value with the button clicked.
    // 2. If the operator value is not empty (if the user typed in an operator before), slice out the excess operator
    // from number two, calculate the 2 numbers, update the operator value and change the input display accordingly.
    // *This if else statement ensures that the multiple string value calculation is correct and does not cause any errors.
    // 3. When the operator button is clicked, empty the number two variable.
    if (operatorValue === "") {
        result = numberTwo;
        numberTwo = numberOne;
        numberOne = result.slice(0, -1);
        operatorValue = operator.textContent;
    } else {
        numberTwo = numberTwo.slice(0, -1);
        calculate();
        operatorValue = operator.textContent;
        input.textContent = result + operatorValue;
    };
    numberTwo = "";
})); // operator buttons

equal.addEventListener("click", () => {
    // HOW THIS WORKS:
    // 1. If the operator value is empty (if the user deleted it before or did not type in one yet),
    // set the output value to equal to the input value.
    // 2. If the operator value is not empty, continue the calculation as normal, output the result and delete the operator.
    if (operatorValue === "") {
        output.textContent = input.textContent;
    } else {
        calculate();
        input.textContent = result;
        operatorValue = "";
    };
}); // equal button