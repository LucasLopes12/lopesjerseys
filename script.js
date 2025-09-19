document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("produtos");

  produtos.forEach(produto => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100">
          <img src="${produto.imagem}" class="card-img-top" alt="${produto.nome}">
          <div class="card-body text-center">
            <h5 class="card-title">${produto.nome}</h5>
            <p class="descricao card-text">${produto.descricao}</p>
            <p><strong>${produto.preco}</strong></p>
            <a href="produtos/produto.html?id=${produto.id}" class="btn btn-primary">Ver mais</a>
          </div>
        </div>
      </div>
    `;
  });
});
