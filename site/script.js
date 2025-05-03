// Dados dos produtos com imagens e sequência
const produtos = [
    {
        nome: "Compressor portátil",
        url: "https://s.shopee.com.br/4An5r67XDK",
        imagem: "https://down-br.img.susercontent.com/file/br-11134207-7r98o-lqk9vt0f1fz36d.webp", // Substituir com URL real da imagem
        categoria: "Eletrônicos",
        sequencia: "001" // Número de sequência formatado
    },
    {
        nome: "Parafusadeira/Furadeira",
        url: "https://s.shopee.com.br/6fUQniCVNq",
        imagem: "https://sdmntpreastus2.oaiusercontent.com/files/00000000-6ff4-61f6-b0e3-dc07b28d15c9/raw?se=2025-05-03T01%3A09%3A41Z&sp=r&sv=2024-08-04&sr=b&scid=17cac00e-187a-51f9-8724-04f804a9bf77&skoid=3f3a9132-9530-48ef-96b7-fee5a811733f&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-02T20%3A37%3A50Z&ske=2025-05-03T20%3A37%3A50Z&sks=b&skv=2024-08-04&sig=o/3%2BFujzDqoPXJB1rMXrDqa1LmWqZXUZUEWUyXLgvvs%3D", // Substituir com URL real da imagem
        categoria: "Eletrônicos",
        sequencia: "002"
    },
    {
        nome: "Produto 3",
        url: "https://exemplo.com/produto3",
        imagem: "/api/placeholder/50/50", // Substituir com URL real da imagem
        categoria: "Casa",
        sequencia: "003"
    },
    {
        nome: "Produto 4",
        url: "https://exemplo.com/produto4",
        imagem: "/api/placeholder/50/50", // Substituir com URL real da imagem
        categoria: "Games",
        sequencia: "004"
    },
    {
        nome: "Produto 5",
        url: "https://exemplo.com/produto5",
        imagem: "/api/placeholder/50/50", // Substituir com URL real da imagem
        categoria: "Livros",
        sequencia: "005"
    }
];

// Função para remover acentos de um texto
function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Função para carregar os links dinamicamente
function carregarLinks(filtro = '') {
    const linksContainer = document.getElementById('links-container');
    linksContainer.innerHTML = '';
    
    const filtroSemAcento = removerAcentos(filtro.toLowerCase());
    
    // Trata casos como "produto1" para encontrar "Produto 1"
    const filtroNormalizado = filtroSemAcento
        .replace(/([a-z])(\d+)/g, '$1 $2') // Adiciona espaço entre letra e número
        .replace(/produto(\s*\d+)/gi, 'produto $1') // Normaliza "produto1" para "produto 1"
        .trim();
    
    const produtosFiltrados = filtro 
        ? produtos.filter(produto => {
            const nomeSemAcento = removerAcentos(produto.nome.toLowerCase());
            const nomeNormalizado = nomeSemAcento.replace(/\s+/g, ' '); // Remove espaços extras
            const categoriaSemAcento = removerAcentos(produto.categoria.toLowerCase());
            const sequenciaSemAcento = produto.sequencia;
            
            // Busca tanto pelo filtro original quanto pelo normalizado
            return nomeNormalizado.includes(filtroSemAcento) || 
                   nomeNormalizado.includes(filtroNormalizado) || 
                   nomeNormalizado.replace(/\s+/g, '').includes(filtroSemAcento) || // Remove todos os espaços
                   categoriaSemAcento.includes(filtroSemAcento) ||
                   sequenciaSemAcento.includes(filtroSemAcento); // Busca também pela sequência
          })
        : produtos;
    
    if (produtosFiltrados.length === 0) {
        linksContainer.innerHTML = `
            <div class="alert alert-warning text-center">
                Nenhum produto encontrado para "${filtro}" 😕
            </div>
        `;
        return;
    }
    
    produtosFiltrados.forEach(produto => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card link-card shadow mb-3'; // Adicionei margem inferior
        
        cardDiv.innerHTML = `
            <a href="${produto.url}" target="_blank" rel="noopener noreferrer" class="card-body d-flex align-items-center py-3">
                <div class="sequence-badge">${produto.sequencia}</div>
                <img src="${produto.imagem}" alt="${produto.nome}" class="product-img">
                <div>
                    <span class="fw-bold fs-5">${produto.nome}</span>
                    <span class="badge category-badge">${produto.categoria}</span>
                </div>
            </a>
        `;
        
        linksContainer.appendChild(cardDiv);
    });
}

// Alternar tema claro/escuro
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.textContent = '☀️';
        themeToggle.classList.remove('btn-light');
        themeToggle.classList.add('btn-dark');
    } else {
        themeToggle.textContent = '🌙';
        themeToggle.classList.remove('btn-dark');
        themeToggle.classList.add('btn-light');
    }
});

// Inicializar a página
window.addEventListener('DOMContentLoaded', () => {
    carregarLinks();
    
    // Configurar a funcionalidade de busca
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    // Variável para controlar o tempo entre buscas
    let timeoutId = null;
    
    // Função para realizar a busca
    function realizarBusca() {
        const termo = searchInput.value.trim();
        carregarLinks(termo);
    }
    
    // Evento de digitação no campo de busca com debounce
    searchInput.addEventListener('input', () => {
        // Limpa o timeout anterior
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Define um novo timeout (300ms de atraso para melhor desempenho)
        timeoutId = setTimeout(() => {
            realizarBusca();
        }, 300);
    });
    
    // Mantém o evento de clique no botão de busca
    searchButton.addEventListener('click', realizarBusca);
    
    // Mantém o evento de pressionar Enter no campo de busca
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            realizarBusca();
        }
    });
});

// Rastrear cliques nos links (opcional)
document.addEventListener('click', (e) => {
    const link = e.target.closest('.link-card a');
    if (link) {
        const linkText = link.textContent.trim();
        console.log(`Link clicado: ${linkText}`);
        
        // Aqui você poderia implementar analytics
        // Por exemplo: gtag('event', 'click', { 'link_name': linkText });
    }
});