let total = 0;
let buffer = "0";
let lastOperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        //not a number
        handleSymbol(value);
    } else {
        //number
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function flushOperation(intBuffer) {
    switch (lastOperator) {
        case 'C':
            buffer = "0";
            break;
        case '+':
            total += intBuffer;
            break;
        case '-':
            total -= intBuffer;
            break;
        case '×':
            total *= intBuffer;
            break;
        case '÷':
            total /= intBuffer;
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') {
        return;
    }
    const intBuffer = parseInt(buffer);
    if (total === 0) {
        total = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    lastOperator = symbol;

    buffer = '0';
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = "0";
            break;
        case '←':
            if (buffer.length == 1) {
                buffer = '0';
            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '=':
            if (lastOperator === null) {
                return;
            }
            flushOperation(parseInt(buffer));
            lastOperator = '=';
            buffer = total;
            total = 0;
            break;
        case '+':
        case '-':
        case '×':
        case '÷':
            handleMath(symbol)
            break;
    }

}

function handleNumber(valueString) {
    if (lastOperator === '=') {
        buffer = '0';
        lastOperator = null;
    }
    if (buffer === "0") {
        buffer = valueString;
    } else {
        buffer += valueString;
    }
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function(event) {
            buttonClick(event.target.innerText);
        })
}

init();