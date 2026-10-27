/* global produtos -- lista definida em produtos.js */
// A. Estado e variáveis com referência de elementos do DOM
const storageKey = "produtos-selecionados";

if (!localStorage.getItem(storageKey)) {
  localStorage.setItem(storageKey, JSON.stringify([]));
}

const productsList = document.getElementById("lista-produtos");
const carrinhoList = document.getElementById("lista-cesto");
const custoTotal = document.getElementById("custo-total");

// B. Funções utilitárias
function criaProduto(produto) {
  const article = document.createElement("article");

  const title = document.createElement("h3");
  title.textContent = produto.title;

  const image = document.createElement("img");
  image.src = produto.image;
  image.alt = produto.title;

  const price = document.createElement("p");
  price.textContent = "Custo total: " + produto.price + " €";

  const rating = document.createElement("p");
  rating.textContent = "Rating: " + produto.rating.rate + "/5";

  const description = document.createElement("p");
  description.textContent = produto.description;
  description.classList.add("description");

  const button = document.createElement("button");
  button.textContent = "+ Adicionar ao Cesto";
  button.addEventListener("click", () => adicionarAoCesto(produto));

  article.append(title, image, price, rating, description, button);

  return article;
}

function criaProdutoCesto(produto) {
  const article = document.createElement("article");

  const title = document.createElement("h3");
  title.textContent = produto.title;

  const image = document.createElement("img");
  image.src = produto.image;
  image.alt = produto.title;

  const price = document.createElement("p");
  price.textContent = "Custo total: " + produto.price + " €";

  const button = document.createElement("button");
  button.textContent = "- Remover do Cesto";
  button.addEventListener("click", () => removerDoCesto(produto));

  article.append(title, image, price, button);

  return article;
}

function lerCesto() {
  return JSON.parse(localStorage.getItem(storageKey));
}

function guardarCesto(lista) {
  localStorage.setItem(storageKey, JSON.stringify(lista));
}

function estaNoCesto(lista, produto) {
  const ids = lista.map((item) => item.id);
  return ids.includes(produto.id);
}

function calcularTotal(lista) {
  const total = lista.reduce((sum, produto) => sum + produto.price, 0);
  return Math.round(total * 100) / 100;
}

// C. Event handlers
function renderizarProdutos(produtos) {
  produtos.forEach((produto) => {
    const article = criaProduto(produto);
    productsList.append(article);
  });
}

function atualizaCesto() {
  const lista = lerCesto();

  carrinhoList.innerHTML = "";

  lista.forEach((produto) => {
    const article = criaProdutoCesto(produto);
    carrinhoList.append(article);
  });

  custoTotal.textContent = "Custo total: " + calcularTotal(lista) + " €";
}

function adicionarAoCesto(produto) {
  const lista = lerCesto();

  if (!estaNoCesto(lista, produto)) {
    lista.push(produto);
    guardarCesto(lista);
    atualizaCesto();
  }
}

function removerDoCesto(produto) {
  const lista = lerCesto().filter((item) => item.id !== produto.id);
  guardarCesto(lista);
  atualizaCesto();
}

// D. Event Listeners

// E. Inicialização
renderizarProdutos(produtos);
atualizaCesto();
