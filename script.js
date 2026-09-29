function calculator(a,b,operator){
    if(operator==="/"&&b===0){
        return "Error: Pembagian dengan 0 tidak diperbolehkan!";
    }
    if(operator==="+"){
        return a+b;
    }
    if(operator==="-"){
        return a-b;
    }
    if(operator==="*"){
        return a*b;
    }
    if(operator==="/"){
        return a/b;
    }
    return "Error: Operator tidak valid";
}

const display=document.getElementById("display");
let currentValue="0";
let firstValue=null;
let operator=null;
let waitingForSecondValue=false;

function updateDisplay(){
    display.textContent=currentValue.replace(".",",");
}

function inputNumber(number){
    if(waitingForSecondValue||currentValue.startsWith("Error")){
        currentValue=number;
        waitingForSecondValue=false;
    }else{
        if(currentValue==="0"){
            currentValue=number;
        }else{
            currentValue=currentValue+number;
        }
    }
    updateDisplay();
}

function inputDecimal(){
    if(waitingForSecondValue){
        currentValue="0.";
        waitingForSecondValue=false;
    }else if(!currentValue.includes(".")){
        currentValue=currentValue+".";
    }
    updateDisplay();
}

function chooseOperator(nextOperator){
    const value=Number(currentValue);

    if(operator&&!waitingForSecondValue){
        const result=calculator(firstValue,value,operator);

        if(typeof result==="string"){
            currentValue=result;
            firstValue=null;
            operator=null;
            waitingForSecondValue=false;
            updateDisplay();
            return;
        }

        currentValue=String(result);
        firstValue=result;
    }else{
        firstValue=value;
    }

    operator=nextOperator;
    waitingForSecondValue=true;
    updateDisplay();
}

function calculateResult(){
    if(operator===null||firstValue===null){
        return;
    }

    const secondValue=Number(currentValue);
    const result=calculator(firstValue,secondValue,operator);

    if(typeof result==="string"){
        currentValue=result;
    }else{
        currentValue=String(result);
    }

    firstValue=null;
    operator=null;
    waitingForSecondValue=false;
    updateDisplay();
}

function clearCalculator(){
    currentValue="0";
    firstValue=null;
    operator=null;
    waitingForSecondValue=false;
    updateDisplay();
}

function backspace(){
    if(currentValue.startsWith("Error")||waitingForSecondValue){
        return;
    }

    if(currentValue.length>1){
        currentValue=currentValue.slice(0,-1);
    }else{
        currentValue="0";
    }

    updateDisplay();
}

function percentage(){
    if(currentValue.startsWith("Error")){
        return;
    }

    currentValue=String(Number(currentValue)/100);
    updateDisplay();
}

function toggleSign(){
    if(currentValue==="0"||currentValue.startsWith("Error")){
        return;
    }

    if(currentValue.startsWith("-")){
        currentValue=currentValue.slice(1);
    }else{
        currentValue="-"+currentValue;
    }

    updateDisplay();
}

document.querySelectorAll("[data-number]").forEach((button)=>{
    button.addEventListener("click",()=>{
        inputNumber(button.dataset.number);
    });
});

document.querySelectorAll("[data-operator]").forEach((button)=>{
    button.addEventListener("click",()=>{
        chooseOperator(button.dataset.operator);
    });
});

document.querySelector('[data-action="equals"]').addEventListener("click",calculateResult);

document.querySelector('[data-action="clear"]').addEventListener("click",clearCalculator);

document.querySelector('[data-action="backspace"]').addEventListener("click",backspace);

document.querySelector('[data-action="percent"]').addEventListener("click",percentage);

document.querySelector('[data-action="toggle-sign"]').addEventListener("click",toggleSign);

document.querySelector('[data-action="decimal"]').addEventListener("click",inputDecimal);

updateDisplay();