const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null
};

const keys = document.querySelector('.calculator-keys')

function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
}

function displayNumber(input) {
    if (calculator.displayValue == '0' && input != '0')
        calculator.displayValue = input;
    else if (calculator.displayValue != '0')
        calculator.displayValue += input;
}

function addDecimals() {
    if (!calculator.displayValue.includes('.'))
        calculator.displayValue += '.';
}

function clearDisplay() {
    if (calculator.displayValue != '0')
        calculator.displayValue = '0'
}

function resetCalculator()
{
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
}

function operate(firstOperand, secondOperand, operator)
{
    var result;

    console.log(firstOperand, secondOperand, operator);
    if (operator == 'add')
        result = firstOperand + secondOperand;
    else if (operator == 'substract')
        result = firstOperand - secondOperand
    else if (operator == 'multiply')
        result = firstOperand * secondOperand;
    else if (operator == 'divide')
        result = firstOperand / secondOperand;
    calculator.displayValue = String(result);
}

function manageOperators(operator) {
    const operand = parseFloat(calculator.displayValue);
    if (calculator.firstOperand == null)
    {
        calculator.firstOperand = operand;
        clearDisplay();
    }
    if (calculator.waitingForSecondOperand) {
        operate(calculator.firstOperand, operand, calculator.operator);
    }
    if (operator != 'equals') {
        calculator.waitingForSecondOperand = true;
        calculator.operator = operator;
    }
    else
        resetCalculator();
    console.log(calculator);
}

window.addEventListener('load', (e) =>
{
    updateDisplay();
    keys.addEventListener('click', (e) => {
        const clicked  = e.target;
        if (!clicked.matches('button'))
            return;
        else if (clicked.classList.contains('operator'))
            manageOperators(clicked.value);
        else if (clicked.classList.contains('decimal'))
            addDecimals();
        else if (clicked.classList.contains('clear'))
            clearDisplay();
        else
            displayNumber(clicked.value);
        updateDisplay();
    });
});