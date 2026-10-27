// A. Estado e variáveis com referência de elementos do DOM
const storageKey = "produtos-selecionados";

if (!localStorage.getItem(storageKey)) {
    localStorage.setItem(storageKey, JSON.stringify([]));
}

let carrinho = JSON.parse(localStorage.getItem(storageKey));

const productsList = document.getElementById("lista-produtos");
const carrinhoList = document.getElementById("lista-cesto");
const custoTotal = document.getElementById("custo-total");

// B. Funções utilitárias
function criarProduto(produto) {
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

function criarProdutoCesto(produto) {
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

function calcularTotal() {
    const total = carrinho.reduce((sum, produto) => sum + produto.price, 0);
    return Math.round(total * 100) / 100;
}

function estaNoEstado(produto) {
    const ids = carrinho.map((item) => item.id);
    return ids.includes(produto.id);
}

function guardarCesto() {
    localStorage.setItem(storageKey, JSON.stringify(carrinho));
}

// C. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach((produto) => {
        const article = criarProduto(produto);
        productsList.append(article);
    });
}

function renderizarCesto() {
    carrinhoList.innerHTML = "";

    carrinho.forEach((produto) => {
        const article = criarProdutoCesto(produto);
        carrinhoList.append(article);
    });

    custoTotal.textContent = "Custo total: " + calcularTotal() + " €";
}

function adicionarAoCesto(produto) {
    if(!estaNoEstado(produto)) {
        carrinho.push(produto);
        guardarCesto();
        renderizarCesto();
    }
}

function removerDoCesto(produto) {
    carrinho = carrinho.filter((item) => item.id !== produto.id);
    guardarCesto();
    renderizarCesto();
}

// D. Event Listeners


// E. Inicialização
renderizarProdutos(produtos);
renderizarCesto();
