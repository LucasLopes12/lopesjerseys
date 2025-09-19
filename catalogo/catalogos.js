document.addEventListener("DOMContentLoaded", () => {
  const campeonatos = [
    {
      id: "brasileirao",
      nome: "Brasileirão Série A",
      imagem: "../assets/LOGOBRASILEIRAOSERIEA.png"
    },
    {
      id: "laliga",
      nome: "La Liga",
      imagem: "../assets/LOGOLALIGA.png"
    },
    {
      id: "champions",
      nome: "UEFA Champions League",
      imagem: "../assets/LOGOCHAMPIONS.png"
    }
  ];

  const container = document.getElementById("campeonatos");

  campeonatos.forEach(camp => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";

    card.innerHTML = `
      <div class="card h-100 shadow-sm text-center">
        <img src="${camp.imagem}" class="card-img-top p-3" alt="${camp.nome}">
        <div class="card-body">
          <h5 class="card-title">${camp.nome}</h5>
          <a href="liga_escolhida.html?campeonato=${camp.id}" class="btn btn-primary">Ver Times</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
});
