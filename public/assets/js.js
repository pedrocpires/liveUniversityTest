//Captura os elementos HTML que serão tratados nas funções.
let quantity = document.querySelector("#quantityInput");
let content = document.querySelector(".content");
let dropdownButton = document.querySelector(".dropdownButton");
let dropdownOptions = document.querySelector(".dropdownOptions");
let next = document.querySelector("#next");
let previous = document.querySelector("#previous");
let optionButton = document.querySelector("#option");
let sideBar = document.querySelector(".sideBar");

// Cria o array de itens e inicia a página exibida.
var itens = [];
var page = 0;

//Adiciona evento para que verifique a quantidade a cada valor digitado no 'input'.
quantity.addEventListener("keyup", checkQuantity);

// Cria os eventos de click para os botões, PRÓXIMO e ANTERIOR, da paginação.
next.addEventListener("click", function () {
  page++;
  showItens();
});
previous.addEventListener("click", function () {
  page--;
  showItens();
});

//Cria os efeitos de esconder e mostrar a barra lateral com as opções de itens.
optionButton.addEventListener("click", showSideBar);
window.addEventListener("click", (e) => {
  //Verifica se a área clicada pelo usuário pertence a barra lateral ou ao botão 'Option'.
  if (e.path.indexOf(sideBar) == -1 && e.path.indexOf(optionButton) == -1) {
    hideSideBar();
  }
});

//Exibe ou esconde o 'SideBar'.
function showSideBar() {
  sideBar.style.transform = "translateX(202px)";
}
function hideSideBar() {
  sideBar.style.transform = "translateX(-202px)";
}

// Verifica se o valor do 'input' de quantidade é um número válido
// e emite mensagem de erro caso seja inválido.
// São considerados inválidos:
// - números negativos (-10);
// - o número 0 (ZERO);
// - qualquer caracter que não um número ('123Pedro');
// - valor vazio ('')
function checkQuantity() {
  let msgError = document.querySelector("#msgError");

  if (
    !Number.isInteger(Number(quantity.value)) ||
    quantity.value == "" ||
    Number(quantity.value) <= 0
  ) {
    quantity.classList.add("error");
    msgError.style.display = "block";
    quantity.focus();
    // hideSideBar();
    return false;
  } else {
    quantity.classList.remove("error");
    msgError.style.display = "none";
    // showSideBar();
    return true;
  }
}

// Optei por criar um dropdown com botão.
// Função responsável por abrir e fechar o dropdown. Altera levemente a cor quando aberto.
function openDropdown() {
  if (dropdownOptions.style.display == "flex") {
    dropdownButton.style.color = "var(--clr-black";
    dropdownOptions.style.display = "none";
  } else {
    dropdownButton.style.color = "var(--clr-grey-4)";
    dropdownOptions.style.display = "flex";
  }
}

// Cria o array com os itens que serão exibidos como conteúdo.
function createItens(itemOption) {
  // Verifica se o valor em quantidade é válido e cria o array.
  if (checkQuantity()) {
    itens = [];
    page = 0;
    for (let i = 1; i <= quantity.value; i++) {
      itens.push(
        '<div class="contentItem">' +
          '<div class="position">' +
          "<span>" +
          i +
          "</span>" +
          "</div>" +
          '<div class="descriptionItem">' +
          "<p>Item " +
          itemOption +
          i +
          "</p>" +
          "</div>" +
          "</div>"
      );
    }
    // Executa a função que irá exibir os itens.
    showItens();
    hideSideBar();
  }
}

// Exibe no elemento "content" os itens do array de acordo com a página
function showItens() {
  content.innerHTML = "";
  for (let i = page * 3; i < page * 3 + 3 && i < itens.length; i++) {
    content.innerHTML += itens[i];
  }
  createPagination();
}

// Cria o sistema de páginação para que sejam exibidos no máximo 3 itens
function createPagination() {
  //Captura os elementos HTML.
  let pagination = document.querySelector(".pagination");

  // Faz o cálculo do número de páginas pela quantidade de itens do array.
  let nPages = Math.floor((itens.length - 1) / 3);

  // Verifica se haverá mais de uma pagina...
  if (nPages >= 1) {
    // ... e exibe a 'div' de paginação caso tenha MAIS de 1 página.
    pagination.style.display = "flex";
    // Verifica qual o número da página e desabilita os botões 'next' e 'previous'
    // de acordo com a necessidade
    if (page > 0 && page < nPages) {
      next.disabled = false;
      previous.disabled = false;
    } else if (page == 0) {
      previous.disabled = true;
      next.disabled = false;
    } else if (page == nPages) {
      previous.disabled = false;
      next.disabled = true;
    } else {
      previous.disabled = true;
      next.disabled = true;
    }
  } else {
    // ... e esconde a 'div' de paginação caso tenha MENOS de 1 página.
    pagination.style.display = "none";
  }
}
