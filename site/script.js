// Dados dos produtos (você pode substituir com seus próprios dados)
const produtos = [
    {
        nome: "Produto 1",
        url: "https://exemplo.com/produto1",
        icone: "📱",
        categoria: "Eletrônicos"
    },
    {
        nome: "Produto 2",
        url: "https://exemplo.com/produto2",
        icone: "👕",
        categoria: "Moda"
    },
    {
        nome: "Produto 3",
        url: "https://exemplo.com/produto3",
        icone: "🏠",
        categoria: "Casa"
    },
    {
        nome: "Produto 4",
        url: "https://exemplo.com/produto4",
        icone: "🎮",
        categoria: "Games"
    },
    {
        nome: "Produto 5",
        url: "https://exemplo.com/produto5",
        icone: "📚",
        categoria: "Livros"
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
            
            // Busca tanto pelo filtro original quanto pelo normalizado
            return nomeNormalizado.includes(filtroSemAcento) || 
                   nomeNormalizado.includes(filtroNormalizado) || 
                   nomeNormalizado.replace(/\s+/g, '').includes(filtroSemAcento) || // Remove todos os espaços
                   categoriaSemAcento.includes(filtroSemAcento);
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
        cardDiv.className = 'card link-card shadow';
        
        cardDiv.innerHTML = `
            <a href="${produto.url}" target="_blank" rel="noopener noreferrer" class="card-body d-flex align-items-center py-3">
                <span class="fs-4 me-2">${produto.icone}</span>
                <span class="fw-bold">${produto.nome}</span>
                <span class="badge category-badge">${produto.categoria}</span>
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