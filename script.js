const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');
const decimalBtn = document.querySelectorAll('[id*=decimal]');


let newNumber = true;//verifica se é o primeiro número digitado
let operator; // guarda a operação 
let previousNumber;//número anterior
/**
 * função adiciona numero digitado na tela
 * @param {numero digital} numero 
 */
function updateDisplay(numero) {
    if(newNumber) {
        if(numero == 0){
            numero = "0,";
        }
        display.textContent = numero;
        newNumber = false;
    }
    else display.textContent += numero;
}

/**
 * Muda caracter virgula por ponto e vice-versa
 * @param {, ou .} event 
 */
function mudaCaracterDecimal(event) {
    if(display.textContent.indexOf(",") != -1) {
        display.textContent = display.textContent.replace(",",".");
    }else{
        display.textContent = display.textContent.replace(".",",");
    }
}

/**
 * recebe evento de clique e verifica se o botão do meio do mouse
 * foi pressionado para mudar a virgula por ponto e vice-versa
 * @param {listener} event 
 */
const insertDecimal = (event) => {
    if (event.button == 1 || event.buttons == 4) {
        event.target.textContent == ","?event.target.textContent =".":event.target.textContent =",";
        mudaCaracterDecimal(event);
    }else{
        let decimal = event.target.textContent;
        if(display.textContent.trim().length == 0) {
            decimal ="0"+decimal;
            updateDisplay(decimal);
        }else{
            if(display.textContent.trim().indexOf(decimal) == -1){
               updateDisplay(decimal);
            }
        }
        
    }
    
}
/**
 * função que escuta os botões
 * e atualiza na tela
 * @param {*} event 
 */
const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo
//atribui o listener do click nos botões
buttons.forEach((button) => button.addEventListener('click', insertNumber));
//atribui o listener do click na virgula/ponto
decimalBtn.forEach((decimalBtn) => decimalBtn.addEventListener('mousedown', insertDecimal));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
}
//atribui o listener nos botoes de operação
operators.forEach((operator) => operator.addEventListener('click', selectOperator));
//realiza o calculo
const calculate = () => {
    if(display.textContent.trim().length > 0){
        const actualNumber = display.textContent;
        let act = parseFloat(new String(actualNumber).replace(",","."));
        let prev =  parseFloat(new String(previousNumber).replace(",","."));
        const result = eval(`prev${operator}act`); //template string, utilizando craze
        newNumber = true;
        updateDisplay(new String(result).replace(".",","));
    }
    
}
//pega o selector '=' e coloca em uma variável
const equal = document.querySelector("#igual");
//atribui o listener do botão igual 
equal.addEventListener('click', calculate);
//limpa a tela 
const clearDisplay = () => (display.textContent = "");
//atribui o listener do botão CE
document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);
//realiza a operação de limpar a tela
const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};
//pega o selector '<<' e adicionar o evento click 
document.querySelector("#limparCalculo").addEventListener("click", clearCalc);
//remove o ultima caracter da tela
const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));
//pega o selector 'C' e adicionar o evento click 
document.querySelector("#backspace").addEventListener("click", removeLastNumber);
//muda o sinal + para - e vice-versa
const invertSignal = () => {
    newNumber = true;
    updateDisplay(display.textContent * -1);
}
//pega o selector '+-' e adicionar o evento click 
document.querySelector("#inverter").addEventListener("click", invertSignal);