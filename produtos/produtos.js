const produtos = [
  {
    id: 1,
    nome: 'Camisa Corinthians 2025 Home',
    preco: 'R$ 179,99',
    precoAntigo: 'R$ 219,99',
    descricao: 'Camisa oficial do Timão, disponível em todos os tamanhos e modelos.',
    imagem: 'assets/CORINTHIANS2025HOME1.webp',
    tamanhos: ['P','M','G','GG'],
    estoque: 1,
    campeonato: 'brasileirao',
    imagens: [
      '../assets/CORINTHIANS2025HOME1.webp',
      '../assets/CORINTHIANS2025HOME2.webp',
      '../assets/CORINTHIANS2025HOME3.webp'
    ]
  },
  {
    id: 2,
    nome: 'Camisa São Paulo 2025 Home',
    preco: 'R$ 179,99',
    precoAntigo: 'R$ 219,99',
    descricao: 'Camisa oficial do Tricolor Paulista, disponível em todos os tamanhos e modelos.',
    imagem: 'assets/SAOPAULO2025HOME1.jpg',
    tamanhos: ['P','M','G','GG'],
    estoque: 1,
    campeonato: 'brasileirao',
    imagens: [
      '../assets/SAOPAULO2025HOME1.jpg',
      '../assets/SAOPAULO2025HOME2.jpg',
      '../assets/SAOPAULO2025HOME3.jpg'
    ]
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const produto = produtos.find(p => p.id == id);

  if (!produto) {
    document.getElementById("produto").innerHTML = "<p>Produto não encontrado!</p>";
    return;
  }

  // Miniaturas
  let miniaturasHTML = produto.imagens.map((img, i) =>
    `<img src="${img}" class="mini-img ${i===0?'active':''}" alt="Miniatura">`
  ).join('');

  // HTML do produto
  document.getElementById("produto").innerHTML = `
    <div class="row g-4">
      <div class="col-md-6 text-center">
        <div class="img-wrapper" style="position: relative; display: inline-block;">
          <img id="imgPrincipal" src="${produto.imagens[0]}" class="produto-img rounded shadow-sm mb-3" 
            style="width:100%;display:block;transition:opacity 0.5s;">
          <button id="prevImg" style="position:absolute;top:50%;left:10px;transform:translateY(-50%);background:rgba(0,0,0,0.3);border:none;color:white;font-size:2rem;width:40px;height:40px;border-radius:50%;cursor:pointer;opacity:0;display:flex;align-items:center;justify-content:center;transition:opacity 0.3s;">❮</button>
          <button id="nextImg" style="position:absolute;top:50%;right:10px;transform:translateY(-50%);background:rgba(0,0,0,0.3);border:none;color:white;font-size:2rem;width:40px;height:40px;border-radius:50%;cursor:pointer;opacity:0;display:flex;align-items:center;justify-content:center;transition:opacity 0.3s;">❯</button>
        </div>
        <div id="miniaturas" class="d-flex gap-2 flex-wrap justify-content-center mt-2">
          ${miniaturasHTML}
        </div>
      </div>

      <div class="col-md-6 detalhes-produto">
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <div class="mb-3">
          ${produto.precoAntigo ? `<p class="text-danger mb-1" style="font-size:1.5rem;"><s>${produto.precoAntigo}</s></p>` : ""}
          <p class="fw-bold text-success mb-0" style="font-size:2.5rem;"><strong>${produto.preco}</strong></p>
          <p>Estoque disponível: <strong>${produto.estoque}</strong></p>
        </div>

        <label class="form-label">Escolha o tamanho:</label>
        <div id="tamanhos" class="d-flex gap-2 flex-wrap mb-3"></div>

        <button id="btnComprar" class="btn btn-success btn-comprar w-100">Comprar no WhatsApp</button>
      </div>
    </div>
  `;

  // Hover das setas
  const imgWrapper = document.querySelector('.img-wrapper');
  const prevBtn = document.getElementById('prevImg');
  const nextBtn = document.getElementById('nextImg');
  imgWrapper.addEventListener('mouseenter', ()=>{ prevBtn.style.opacity=1; nextBtn.style.opacity=1; });
  imgWrapper.addEventListener('mouseleave', ()=>{ prevBtn.style.opacity=0; nextBtn.style.opacity=0; });

  // Tamanhos
  const containerTamanhos = document.getElementById("tamanhos");
  produto.tamanhos.forEach(tamanho => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary";
    btn.textContent = tamanho;
    btn.addEventListener("click", () => {
      document.querySelectorAll("#tamanhos button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
    containerTamanhos.appendChild(btn);
  });

  // Carrossel com fade
  let imgIndex = 0;
  const imgPrincipal = document.getElementById("imgPrincipal");

  function atualizarImagem(index) {
    imgPrincipal.style.opacity = 0;
    setTimeout(()=>{ 
      imgPrincipal.src = produto.imagens[index];
      imgPrincipal.style.opacity = 1;
    }, 200);
    document.querySelectorAll("#miniaturas img").forEach((m,i)=>m.classList.toggle("active", i===index));
  }

  prevBtn.addEventListener("click", ()=>{
    imgIndex = (imgIndex -1 + produto.imagens.length) % produto.imagens.length;
    atualizarImagem(imgIndex);
  });

  nextBtn.addEventListener("click", ()=>{
    imgIndex = (imgIndex +1) % produto.imagens.length;
    atualizarImagem(imgIndex);
  });

  document.querySelectorAll("#miniaturas img").forEach((mini, index)=>{
    mini.addEventListener("click", ()=>{
      imgIndex = index;
      atualizarImagem(imgIndex);
    });
  });

  // Comprar
  document.getElementById("btnComprar").addEventListener("click", ()=>{
    const btnSelecionado = document.querySelector("#tamanhos button.active");
    if(!btnSelecionado){ alert("Escolha um tamanho!"); return; }
    const mensagem = `Quero comprar ${produto.nome} tamanho ${btnSelecionado.textContent}`;
    window.open(`https://wa.me/5519984519925?text=${encodeURIComponent(mensagem)}`, "_blank");
  });
});
