document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const campeonatoSelecionado = params.get("campeonato"); // ex: "brasileirao"

  const container = document.getElementById("produtos"); 
  const titulo = document.getElementById("titulo-campeonato");

  // Ajusta título
  const nomesCampeonatos = {
    brasileirao: "Brasileirão Série A",
    laliga: "La Liga",
    champions: "UEFA Champions League"
  };
  titulo.textContent = nomesCampeonatos[campeonatoSelecionado] || "Produtos";

  // Filtra produtos
  const produtosFiltrados = produtos.filter(p => p.campeonato === campeonatoSelecionado);

  if (produtosFiltrados.length === 0) {
    container.innerHTML = `<p class="text-center">Nenhum produto encontrado para este campeonato.</p>`;
    return;
  }

  produtosFiltrados.forEach(prod => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <a href="../produtos/produto.html?id=${prod.id}">
          <img src="${prod.imagens[0]}" class="card-img-top" alt="${prod.nome}">
        </a>
        <div class="card-body text-center">
          <h5 class="card-title">${prod.nome}</h5>
          <p class="descricao card-text">${prod.descricao}</p>
          <p class="fw-bold text-success">${prod.preco}</p>
          <a href="../produtos/produto.html?id=${prod.id}" class="btn btn-primary">Ver Mais</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
});
