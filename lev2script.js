document.addEventListener("DOMContentLoaded",function(){
    const inputscreen=document.getElementById("input-screen")
    const displayField=document.getElementById("display")
    const buttons=document.querySelectorAll("button")
    let expression="";
    let shouldClearInput=false;
    
    
    //clear input screen
    function clearInputScreen(){
        //reset expression to empty
        expression="";
        inputscreen.value="";
        displayField.value="";
        shouldClearInput=false;
    }   
    //backspace function (delete last character)
    function deleteLastCharacter(){
        expression = expression.slice(0, -1);
        inputscreen.value=expression;
    }
    //Evaluate Expression()
    function EvaluateExpression(){
        try{
            const result=eval(expression).toString();
            displayField.value=expression;
            inputscreen.value=result;
            shouldClearInput=true;
            expression="";
        }  catch(error){
            inputscreen.value="Error";
        }
    }
    function addOperator(operator){
        if(shouldClearInput){
            clearInputScreen();
        }
        expression =expression + operator;
        inputscreen.value=expression;
    }
    function appendToExpression(text){
         if(shouldClearInput){
            clearInputScreen()
         }
         expression=expression+ text;
         inputscreen.value=expression;
    }
    //sqrt, +/-, 1/x
    function handleOperations(operation){

        //step1:
        if(expression==="")return;
        let result;

        //step2:convert expression to number
        const currentValue=parseFloat(expression)

      //step3:
      switch(operation){
        case "toggleSign":
            result=currentValue * -1;
           break;
        case "sqrt": 
             result=Math.sqrt(currentValue)
             expression=`\u221A(${currentValue})`;
        break;
        case "reciprocal":
            result=(1/currentValue).toFixed(4)
            expression=`1/${currentValue}`
        break;
        case "percentage":
        result = currentValue / 100;
        expression = `${currentValue}%`;
        break;
      }
      //step4:update display
      displayField.value=expression
      expression=result.toString()
      inputscreen.value=expression
      shouldClearInput="true"
    }
    //add event listener to each button
    buttons.forEach(function(button){
        button.addEventListener("click",function(){
            if(button.classList.contains("clear-icon")){
                clearInputScreen();
            }
            else if(button.classList.contains("delete-icon")){
                deleteLastCharacter();
            }
            else if(button.classList.contains("divide-icon")){
                addOperator("/");
            }
            else if(button.classList.contains("equal-icon")){
                EvaluateExpression();
            }
            else if(button.classList.contains("multiply-icon")){
                addOperator("*");
            }
            else if(button.classList.contains("add-icon")){
                addOperator("+");
            }
            else if(button.classList.contains("minus-icon")){
                addOperator("-");
            }
            else if(button.classList.contains("mod-icon")){
                addOperator("%");
            }
            else if (button.classList.contains("percentage-icon")) {
                handleOperations("percentage");
            }
            else if(button.classList.contains("power-icon")){
                addOperator("**");
            }
            else if(button.classList.contains("toggle-sign-icon")){
                handleOperations("toggleSign");
            }
            else if(button.classList.contains("squareroot-icon")){
                handleOperations("sqrt");
            }
            else if(button.classList.contains("reciprocal-icon")){
                handleOperations("reciprocal");
            }
            else{
                appendToExpression(button.innerText);
            }
        });
    });
    });