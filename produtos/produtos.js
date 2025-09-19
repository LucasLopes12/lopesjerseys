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

  // Função para remover a primeira palavra do título
  const removerPrimeiraPalavra = (nome) => {
    const palavras = nome.split(" ");
    palavras.shift(); // Remove a primeira palavra
    return palavras.join(" ");
  }

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
        <h2 id="produtoNome">${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <div class="mb-3">
          ${produto.precoAntigo ? `<p class="text-danger mb-1" style="font-size:1.5rem;"><s>${produto.precoAntigo}</s></p>` : ""}
          <p class="fw-bold text-success mb-0" style="font-size:2.5rem;"><strong>${produto.preco}</strong></p>
          <p>Estoque disponível: <strong>${produto.estoque}</strong></p>
        </div>

        <!-- Tamanhos como botões -->
        <label class="form-label">Escolha o tamanho:</label>
        <div id="tamanhos" class="d-flex gap-2 flex-wrap mb-3"></div>

        <!-- Patrocínio -->
        <div class="mb-3">
          <label for="selectPatrocinio" class="form-label">Patrocínio:</label>
          <select id="selectPatrocinio" class="form-select">
            ${produto.patrocinios.map(p => `<option value="${p}">${p}</option>`).join('')}
          </select>
        </div>

        <!-- Patch -->
        <div class="mb-3">
          <label for="selectPatch" class="form-label">Patch:</label>
          <select id="selectPatch" class="form-select">
            ${produto.patches.map(pt => `<option value="${pt}">${pt}</option>`).join('')}
          </select>
        </div>

        <button id="btnComprar" class="btn btn-success btn-comprar w-100">Comprar no WhatsApp</button>
      </div>
    </div>
  `;

  // Função para adaptar o título para dispositivos móveis
  const ajustarTituloParaMobile = () => {
    const nomeProduto = document.getElementById("produtoNome");
    if (window.innerWidth < 768) {
      // Remover a primeira palavra do nome do produto
      nomeProduto.textContent = removerPrimeiraPalavra(produto.nome);
      nomeProduto.style.fontSize = "1.5rem"; // Tamanho menor para dispositivos móveis
    } else {
      nomeProduto.textContent = produto.nome; // Exibir o nome completo para telas maiores
      nomeProduto.style.fontSize = "2.5rem"; // Tamanho padrão
    }
  }

  // Chamar a função no carregamento e sempre que o tamanho da janela mudar
  ajustarTituloParaMobile();
  window.addEventListener('resize', ajustarTituloParaMobile);

  // Hover das setas
  const imgWrapper = document.querySelector('.img-wrapper');
  const prevBtn = document.getElementById('prevImg');
  const nextBtn = document.getElementById('nextImg');
  imgWrapper.addEventListener('mouseenter', ()=>{ prevBtn.style.opacity=1; nextBtn.style.opacity=1; });
  imgWrapper.addEventListener('mouseleave', ()=>{ prevBtn.style.opacity=0; nextBtn.style.opacity=0; });

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

  // Tamanhos como botões
  const containerTamanhos = document.getElementById("tamanhos");
  let tamanhoSelecionado = null;
  produto.tamanhos.forEach(tamanho => {
    const btn = document.createElement("button");
    btn.className = "btn btn-outline-primary";
    btn.textContent = tamanho;
    btn.addEventListener("click", () => {
      document.querySelectorAll("#tamanhos button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      tamanhoSelecionado = tamanho;
    });
    containerTamanhos.appendChild(btn);
  });

  // Comprar
  document.getElementById("btnComprar").addEventListener("click", ()=>{
    const patrocinio = document.getElementById("selectPatrocinio").value;
    const patch = document.getElementById("selectPatch").value;

    if(!tamanhoSelecionado){ alert("Escolha um tamanho!"); return; }

    const mensagem = `Quero comprar ${produto.nome} - Tamanho: ${tamanhoSelecionado}, Patrocínio: ${patrocinio}, Patch: ${patch}`;
    window.open(`https://wa.me/5519984519925?text=${encodeURIComponent(mensagem)}`, "_blank");
  });
});
