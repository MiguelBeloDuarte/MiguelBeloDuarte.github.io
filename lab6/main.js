// declaração de variáveis
const nodeInputNumero = document.querySelector('#colecao ~ section input[type = number]');
const nodeInputSubmit = document.querySelector('#colecao ~ section input[type = submit]');
const nodeUlColecao = document.querySelector('#colecao ul');

const colecao = [];
const nodeForm = document.querySelector('#colecao ~ section form');
const nodeSpanTotal = document.querySelector('#colecao span');

const repetidos = [];
let totalRepetidos = 0;
const nodeUlRepetidos = document.querySelector('#repetidos ul');
const nodeSpanRepetidos = document.querySelector('#repetidos span');

// B. event handlers
function guardaCarta() {
    const carta = Number(nodeInputNumero.value);

    if (colecao.includes(carta)) {
        repetidos.push(carta);
        repetidos.sort((a, b) => a - b);
        atualizaLista(repetidos, nodeUlRepetidos);
        totalRepetidos++;
        nodeSpanRepetidos.textContent = totalRepetidos;
    } else {
        colecao.push(carta);
        colecao.sort((a, b) => a - b);
        atualizaLista(colecao, nodeUlColecao);
        nodeSpanTotal.textContent = colecao.length;
    }

}

function atualizaLista(lista, nodeUl) {
    nodeUl.innerHTML = "";
    lista.forEach(carta => nodeUl.innerHTML += "<li>" + carta + "</li>");
}

// C. event listeners
nodeForm.onsubmit = (event) => {
    event.preventDefault();
    guardaCarta();
};
