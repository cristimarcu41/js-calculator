// create class Calculator
class Calculator {
    constructor(currentOperandTextElem, previousOperandTextElem) {
        this.currentOperandTextElem = currentOperandTextElem;
        this.previousOperandTextElem = previousOperandTextElem;
        this.clear()
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    append(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '÷':
                computation = prev / current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber=number.toString();
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay=''
        } else {
            integerDisplay=integerDigits.toLocaleString('ro', {maximumFractionDigits:0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElem.innerText = this.getDisplayNumber(this.currentOperand);

        if (this.operation !== undefined) {
            this.previousOperandTextElem.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElem.innerText = '';
        }
    }

}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElem = document.querySelector("[data-previous-operand]");
const currentOperandTextElem = document.querySelector("[data-current-operand]");


const calculator = new Calculator(currentOperandTextElem, previousOperandTextElem)
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.append(button.innerText);
        calculator.updateDisplay();
    })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})
allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})
