// A. Estado e variáveis com referência de elementos do DOM
const storageKey = "produtos-selecionados-lab8";
const apiUrl = "https://deisishop.pw.deisi.ulusofona.pt";

let produtos = [];

if (!localStorage.getItem(storageKey)) {
  localStorage.setItem(storageKey, JSON.stringify([]));
}

const productsList = document.getElementById("lista-produtos");
const carrinhoList = document.getElementById("lista-cesto");
const custoTotal = document.getElementById("custo-total");

const filtroCategoria = document.getElementById("filtro-categoria");
const ordenarPreco = document.getElementById("ordenar-preco");
const pesquisa = document.getElementById("pesquisa");

const checkoutForm = document.getElementById("checkout");
const estudante = document.getElementById("estudante");
const cupao = document.getElementById("cupao");
const resultadoCompra = document.getElementById("resultado-compra");

// B. Funções utilitárias
function criaProduto(produto) {
  const article = document.createElement("article");

  const title = document.createElement("h3");
  title.textContent = produto.title;

  // a API devolve o caminho da imagem sem o domínio
  const image = document.createElement("img");
  image.src = apiUrl + produto.image;
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
  image.src = apiUrl + produto.image;
  image.alt = produto.title;

  const price = document.createElement("p");
  price.textContent = "Custo total: " + produto.price + " €";

  const button = document.createElement("button");
  button.textContent = "- Remover do Cesto";
  button.addEventListener("click", () => removerDoCesto(produto));

  article.append(title, image, price, button);

  return article;
}

function criaOpcaoCategoria(categoria) {
  const option = document.createElement("option");
  option.value = categoria.name;
  option.textContent = categoria.name;

  return option;
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
  return total.toFixed(2);
}

function mostraResultado(linhas, erro) {
  resultadoCompra.innerHTML = "";

  linhas.forEach((linha) => {
    const p = document.createElement("p");
    p.textContent = linha;
    resultadoCompra.append(p);
  });

  if (erro) {
    resultadoCompra.classList.add("erro");
  } else {
    resultadoCompra.classList.remove("erro");
  }
}

// C. Event handlers
function renderizarProdutos(lista) {
  productsList.innerHTML = "";

  if (lista.length === 0) {
    productsList.textContent = "Nenhum produto encontrado.";
  }

  lista.forEach((produto) => {
    const article = criaProduto(produto);
    productsList.append(article);
  });
}

// aplica o filtro, a pesquisa e a ordenação aos produtos da API
function filtrarProdutos() {
  const categoria = filtroCategoria.value;
  const texto = pesquisa.value.trim().toLowerCase();

  // cópia da lista, para o sort não alterar a ordem original
  let lista = [...produtos];

  if (categoria !== "") {
    lista = lista.filter((produto) => produto.category === categoria);
  }

  // se o texto existir no título, o replace retira-o e o título fica diferente
  if (texto !== "") {
    lista = lista.filter((produto) => {
      const titulo = produto.title.toLowerCase();
      return titulo.replace(texto, "") !== titulo;
    });
  }

  if (ordenarPreco.value === "asc") {
    lista.sort((a, b) => a.price - b.price);
  }

  if (ordenarPreco.value === "desc") {
    lista.sort((a, b) => b.price - a.price);
  }

  renderizarProdutos(lista);
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

// GET /products: obtém os produtos da loja
function carregarProdutos() {
  fetch(apiUrl + "/products")
    .then((response) => response.json())
    .then((data) => {
      // a API devolve o preço como texto ("22.50");
      // o JSON.parse transforma esse texto no número 22.5
      data.forEach((produto) => {
        produto.price = JSON.parse(produto.price);
      });

      produtos = data;
      filtrarProdutos();
    })
    .catch((error) => {
      console.error("Erro ao obter produtos:", error);
      productsList.textContent = "Não foi possível carregar os produtos.";
    });
}

// GET /categories: obtém as categorias para o filtro
function carregarCategorias() {
  fetch(apiUrl + "/categories")
    .then((response) => response.json())
    .then((categorias) => {
      categorias.forEach((categoria) => {
        filtroCategoria.append(criaOpcaoCategoria(categoria));
      });
    })
    .catch((error) => console.error("Erro ao obter categorias:", error));
}

// POST /buy: envia os produtos do cesto e recebe o total e a referência
function comprar(event) {
  event.preventDefault();

  const lista = lerCesto();

  if (lista.length === 0) {
    mostraResultado(["O cesto está vazio."], true);
    return;
  }

  const dados = {
    products: lista.map((produto) => produto.id),
    student: estudante.value === "sim",
    coupon: cupao.value.trim(),
  };

  fetch(apiUrl + "/buy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  })
    .then((response) => response.json())
    .then((data) => {
      // em caso de erro (400 ou 404) a API responde com { error: "..." }
      if (data.error) {
        mostraResultado(["Erro: " + data.error], true);
        return;
      }

      mostraResultado(
        [
          "Valor final a pagar (com eventuais descontos): " +
            data.totalCost +
            " €",
          "Referência de pagamento: " + data.reference,
        ],
        false,
      );
    })
    .catch((error) => {
      console.error("Erro na compra:", error);
      mostraResultado(["Não foi possível concluir a compra."], true);
    });
}

// D. Event Listeners
filtroCategoria.addEventListener("change", filtrarProdutos);
ordenarPreco.addEventListener("change", filtrarProdutos);
pesquisa.addEventListener("input", filtrarProdutos);
checkoutForm.addEventListener("submit", comprar);

// E. Inicialização
carregarCategorias();
carregarProdutos();
atualizaCesto();
