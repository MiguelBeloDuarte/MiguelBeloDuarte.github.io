// A. Estado e variáveis com referência de elementos do DOM
const productsList = document.getElementById("lista-produtos");

// B. Funções utilitárias
function criarProduto(produto) {
    const article = document.createElement("article");

    const title = document.createElement("h2");
    title.textContent = produto.title;

    const image = document.createElement("img");
    image.src = produto.image;
    image.alt = produto.title;

    const description = document.createElement("p");
    description.textContent = produto.description;

    const price = document.createElement("p");
    price.textContent = produto.price + " €";

    const rating = document.createElement("p");
    rating.textContent = "Rating: " + produto.rating.rate + "/ 5";

    article.append(title, image, description, price, rating);

    return article;
}

// C. Event handlers
function renderizarProdutos(produtos) {
    produtos.forEach((produto) => {
        const article = criarProduto(produto);
        productsList.append(article);
    });
}

// D. Event Listeners


// E. Inicialização
renderizarProdutos(produtos);
