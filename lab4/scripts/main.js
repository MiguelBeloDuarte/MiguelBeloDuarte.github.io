/* eslint no-unused-vars: "off" -- as funções são chamadas pelos atributos de evento do HTML */

// ---------- saudação: onclick ----------

// alterna o texto e a cor da saudação a cada clique
function toggleGreeting() {
  const greeting = document.querySelector("#greeting");

  if (greeting.textContent === "Olá!") {
    greeting.textContent = "Adeus!";
    greeting.style.color = "firebrick";
  } else {
    greeting.textContent = "Olá!";
    greeting.style.color = "#1d2b4f";
  }
}

// ---------- passa por aqui: onmouseover e onmouseout ----------

// o rato entrou na zona
function enterZone() {
  const zone = document.querySelector("#zone");

  zone.textContent = "Obrigado por passares!";
  zone.style.backgroundColor = "#f2b33d";
}

// o rato saiu da zona: volta ao estado inicial
function leaveZone() {
  const zone = document.querySelector("#zone");

  zone.textContent = "Passa por aqui!";
  zone.style.backgroundColor = "#e4e8f1";
}

// ---------- pinta-me: onclick ----------

// pinta o fundo da tela com a cor recebida do botão clicado
function paint(color) {
  const canvas = document.querySelector("#canvas");

  canvas.style.backgroundColor = color;
}

// ---------- teclado: onkeydown e onkeyup ----------

let highlighted = false;
let keyCount = 0;

// tecla premida: alterna a cor de fundo do campo
function pressKey() {
  const field = document.querySelector("#typing");

  if (highlighted === false) {
    field.style.backgroundColor = "#f2b33d";
    highlighted = true;
  } else {
    field.style.backgroundColor = "white";
    highlighted = false;
  }
}

// tecla libertada: atualiza o total na página
function releaseKey() {
  const total = document.querySelector("#key-count");

  keyCount++;
  total.textContent = keyCount;
}

// ---------- contador: onclick e ondblclick ----------

let counter = 0;

// soma um e mostra o novo valor
function count() {
  const display = document.querySelector("#counter");

  counter++;
  display.textContent = counter;
}

// volta a zero
function resetCount() {
  const display = document.querySelector("#counter");

  counter = 0;
  display.textContent = counter;
}

// ---------- barra: onmousemove ----------

let progress = 0;

// cada movimento do rato enche a barra 1%, até aos 100%
function fillBar() {
  const bar = document.querySelector("#bar");
  const label = document.querySelector("#bar-label");

  if (progress < 100) {
    progress++;
    bar.style.width = progress + "%";
    label.textContent = progress + "%";
  } else {
    label.textContent = "Cheia!";
  }
}

// esvazia a barra
function emptyBar() {
  const bar = document.querySelector("#bar");
  const label = document.querySelector("#bar-label");

  progress = 0;
  bar.style.width = "0%";
  label.textContent = "0%";
}
