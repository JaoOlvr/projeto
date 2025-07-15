/* =====================================================
   CABRA DOS ACHADOS · SCRIPT PRINCIPAL
   ===================================================== */

/* ---------- Lista de produtos ---------- */
const produtos = [
  {
    nome: "Compressor portátil",
    descricao: "Encha pneus e bolas em segundos. Leve e recarregável 🔋",
    url: "https://s.shopee.com.br/4An5r67XDK",
    imagem: "https://i.pinimg.com/736x/8d/07/3e/8d073ea1dfd28d9b4cfd8ff0950ef0cc.jpg",
    categoria: "Eletrônicos",
    sequencia: "001"
  },
  {
    nome: "Parafusadeira/Furadeira",
    descricao: "Compacta, 2 velocidades e maleta completa. Ideal para DIY 🛠️",
    url: "https://s.shopee.com.br/6fUQniCVNq",
    imagem: "https://i.pinimg.com/736x/42/72/d3/4272d372560feed02428b594702e32ae.jpg",
    categoria: "Ferramentas",
    sequencia: "002"
  },
  {
    nome: "Relógio Smartwatch X9 Pro",
    descricao: "Monitore saúde, notificações e música no pulso. Resistente à água 💧",
    url: "https://s.shopee.com.br/AA4KZfEfF3",
    imagem: "https://i.pinimg.com/736x/20/22/71/202271608644b284ff030db8b15c111f.jpg",
    categoria: "Acessórios",
    sequencia: "003"
  },
  {
    nome: "Macaco Hidráulico",
    descricao: "Suporta até 2T para manutenção segura do seu carro 🚗",
    url: "https://s.shopee.com.br/50MLqv8pLE",
    imagem: "https://i.pinimg.com/736x/a1/69/a5/a169a55d9d779ba4a0da366842d784c7.jpg",
    categoria: "Ferramentas",
    sequencia: "004"
  },
  {
    nome: "Cadeira Ergonômica",
    descricao: "Ajustes 3D e apoio lombar — adeus dores após longas horas 💻",
    url: "https://s.shopee.com.br/7fNQObJWgp",
    imagem: "https://i.pinimg.com/736x/50/a5/ce/50a5ce28e744f183cf6ab2fa0ca9f208.jpg",
    categoria: "Casa",
    sequencia: "005"
  },
  {
    nome: "Lava‑Louças Portátil",
    descricao: "Ideal para apartamentos: instale e lave em 29 min 🍽️",
    url: "https://s.shopee.com.br/8Kd7DGOYJK",
    imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-m850ox58hvxt34@resize_w900_nl.webp",
    categoria: "Casa",
    sequencia: "006"
  }
];

/* ---------- Cores por categoria ---------- */
const coresCategoria = {
  Eletrônicos: "#0d6efd",
  Ferramentas: "#6f42c1",
  Acessórios:  "#d63384",
  Casa:        "#20c997"
};

/* ---------- Utilidade: remover acentos ---------- */
const removerAcentos = txt =>
  txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

/* =====================================================
   CARREGAR / FILTRAR / RENDERIZAR CARDS
   ===================================================== */
function carregarLinks(filtro = "") {
  const elContainer = document.getElementById("links-container");
  elContainer.innerHTML = "";

  const filtroNormal = removerAcentos(filtro.toLowerCase());

  const lista = filtro
    ? produtos.filter(p => {
        const nome      = removerAcentos(p.nome.toLowerCase());
        const categoria = removerAcentos(p.categoria.toLowerCase());
        return (
          nome.includes(filtroNormal) ||
          categoria.includes(filtroNormal) ||
          p.sequencia.includes(filtroNormal)
        );
      })
    : produtos;

  if (!lista.length) {
    elContainer.innerHTML = `
      <div class="alert alert-warning text-center">
          Nenhum produto encontrado para "${filtro}" 😕
      </div>`;
    return;
  }

  /* ---- Cria cada card ---- */
  lista.forEach(p => {
    const card = document.createElement("div");
    card.className = "card link-card shadow";

    card.innerHTML = `
      <!-- Cabeçalho clicável -->
      <div class="card-body d-flex align-items-center py-3 card-toggle"
           role="button">
        <div class="sequence-badge">${p.sequencia}</div>
        <img src="${p.imagem}" alt="${p.nome}" class="product-img"
             loading="lazy">
        <div class="flex-grow-1">
          <span class="fw-bold fs-5">${p.nome}</span>
          <span class="badge category-badge"
                style="background-color:${coresCategoria[p.categoria] || "#000"}">
            ${p.categoria}
          </span>
        </div>
      </div>

      <!-- Detalhes ocultos -->
      <div class="card-details">
        <p class="mb-3">${p.descricao}</p>
        <a class="btn btn-warning w-100" href="${p.url}"
           target="_blank" rel="noopener">
           Ver na Shopee
        </a>
      </div>
    `;

    elContainer.appendChild(card);
  });
}

/* ---------- Abrir / fechar cards ---------- */
document.addEventListener("click", e => {
  const toggle = e.target.closest(".card-toggle");
  if (!toggle) return;

  const card   = toggle.closest(".card");
  const aberto = card.classList.contains("open");

  // Fecha todos
  document.querySelectorAll(".card.open")
    .forEach(c => c.classList.remove("open"));

  // Abre se ainda não estava
  if (!aberto) card.classList.add("open");
});

/* =====================================================
   TEMA CLARO / ESCURO
   ===================================================== */
const themeToggle = document.getElementById("themeToggle");

function aplicarTemaSalvo() {
  const salvo    = localStorage.getItem("theme");
  const sistema  = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const escuro   = salvo === "dark" || (!salvo && sistema);

  document.body.classList.toggle("dark-theme", escuro);
  themeToggle.textContent = escuro ? "☀️" : "🌙";
  themeToggle.classList.toggle("btn-dark",  escuro);
  themeToggle.classList.toggle("btn-light", !escuro);
  themeToggle.setAttribute(
    "aria-label",
    escuro ? "Ativar modo claro" : "Ativar modo escuro"
  );
}

themeToggle.addEventListener("click", () => {
  const escuro = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", escuro ? "dark" : "light");

  themeToggle.textContent = escuro ? "☀️" : "🌙";
  themeToggle.classList.toggle("btn-dark",  escuro);
  themeToggle.classList.toggle("btn-light", !escuro);
  themeToggle.setAttribute(
    "aria-label",
    escuro ? "Ativar modo claro" : "Ativar modo escuro"
  );
});

/* =====================================================
   BUSCA COM DEBOUNCE
   ===================================================== */
function iniciarBusca() {
  const input  = document.getElementById("searchInput");
  const button = document.getElementById("searchButton");
  let timeout;

  const buscar = () => carregarLinks(input.value.trim());

  input.addEventListener("input", () => {
    clearTimeout(timeout);
    timeout = setTimeout(buscar, 300);
  });

  button.addEventListener("click", buscar);
  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      clearTimeout(timeout);
      buscar();
    }
  });
}

/* =====================================================
   INICIALIZAÇÃO
   ===================================================== */
window.addEventListener("DOMContentLoaded", () => {
  aplicarTemaSalvo();
  carregarLinks();
  iniciarBusca();
});