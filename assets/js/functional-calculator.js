document.getElementById("calculatorKeysSection").addEventListener('click', function( event ) {
    if ( event.target.classList.contains("calculator-btn") ) {
        const targetedEventInnerText = event.target.innerText;
        const targetedEventValue = targetedEventInnerText.toLowerCase();
        
        switch( targetedEventValue ) {
            case "ac":
                clearDisplay();
                break;
            case "x":
                backspace();
                break;
            case "=":
                resultCalculation();
                break;
            default:
                expression( targetedEventValue );
                const fullExpressionSecondLastIndex = parseFloat( fullExpression[fullExpression.length - 2] );
                const fullExpressionLastIndex = parseFloat( fullExpression[fullExpression.length - 1] );

                if ( isNaN( fullExpressionSecondLastIndex ) && isNaN(fullExpressionLastIndex) ) {
                    fullExpression = fullExpression.slice(0, fullExpression.length - 2) + targetedEventValue;
                    expression('')
                }
                break;
                
        }
    }
});

let fullExpression = ''; 

function expression( newExpression ) {
    fullExpression += newExpression;
    document.getElementById("expressionDisplay").innerText = fullExpression;
}


function backspace() {
    fullExpression = fullExpression.slice(0, fullExpression.length - 1);
    expression('')
}

function resultCalculation() {
    // const result = eval(fullExpression);
    const result = Function("return " + fullExpression)();
    if ( ! isNaN(result) ) {
        document.getElementById("resultDisplay").innerText = result;
        fullExpression = result;
        expression('')
    }
}

function clearDisplay() {
    document.getElementById("resultDisplay").innerText = "00";
    document.getElementById("expressionDisplay").innerText = "";
    fullExpression = '';
}
