// Dados dos produtos com imagens e sequência
const produtos = [
    {
        nome: "Compressor portátil",
        url: "https://s.shopee.com.br/4An5r67XDK",
        imagem: "https://i.pinimg.com/736x/8d/07/3e/8d073ea1dfd28d9b4cfd8ff0950ef0cc.jpg", // Substituir com URL real da imagem
        categoria: "Eletrônicos",
        sequencia: "001" // Número de sequência formatado
    },
    {
        nome: "Parafusadeira/Furadeira",
        url: "https://s.shopee.com.br/6fUQniCVNq",
        imagem: "https://i.pinimg.com/736x/42/72/d3/4272d372560feed02428b594702e32ae.jpg", // Substituir com URL real da imagem
        categoria: "Ferramentas",
        sequencia: "002"
    },
    {
        nome: "Relógio smartwatch x9 pro",
        url: "https://s.shopee.com.br/AA4KZfEfF3",
        imagem: "https://i.pinimg.com/736x/20/22/71/202271608644b284ff030db8b15c111f.jpg", // Substituir com URL real da imagem
        categoria: "Acessórios",
        sequencia: "003"
    },
    {
        nome: "Macaco Hidráulico",
        url: "https://s.shopee.com.br/50MLqv8pLE",
        imagem: "https://i.pinimg.com/736x/a1/69/a5/a169a55d9d779ba4a0da366842d784c7.jpg", // Substituir com URL real da imagem
        categoria: "Ferramentas",
        sequencia: "004"
    },
    {
        nome: "Cadeira Ergonômica",
        url: "https://s.shopee.com.br/7fNQObJWgp",
        imagem: "https://i.pinimg.com/736x/50/a5/ce/50a5ce28e744f183cf6ab2fa0ca9f208.jpg", // Substituir com URL real da imagem
        categoria: "Casa",
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