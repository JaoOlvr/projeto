Links de Produtos - Página Web
Uma página de links de produtos simples e responsiva com tema claro/escuro e busca insensível a acentos.
Estrutura do Projeto
O projeto está organizado em três arquivos principais:

index.html - Estrutura HTML da página
styles.css - Todos os estilos CSS
script.js - Funcionalidades JavaScript

Funcionalidades

Lista de produtos com links
Busca por nome ou categoria (insensível a acentos)
Alternância entre tema claro e escuro
Design responsivo
Animações suaves
Rastreamento de cliques (console.log)

Como Usar

Baixe todos os arquivos do projeto
Para personalizar, edite o array produtos no arquivo script.js
Atualize a foto de perfil, nome e descrição no arquivo index.html
Carregue os arquivos para seu serviço de hospedagem

Opções de Hospedagem
Este projeto pode ser hospedado facilmente em vários serviços, incluindo:
Opções Gratuitas:

GitHub Pages
Netlify
Vercel
Firebase Hosting
Cloudflare Pages

Opções Pagas:

DigitalOcean App Platform
Serviços de hospedagem compartilhada (Hostgator, GoDaddy, etc.)

Personalização
Para adicionar novos produtos:
Adicione novos objetos ao array produtos no arquivo script.js:
javascript{
    nome: "Nome do Produto",
    url: "https://link-do-produto.com",
    icone: "🔣", // Emoji ou ícone
    categoria: "Nome da Categoria"
}
Para mudar as cores:
Edite as variáveis CSS no arquivo styles.css:
css:root {
    --light-gradient-start: #FFCB30; /* Cor inicial do gradiente no tema claro */
    --light-gradient-end: #FFA500;   /* Cor final do gradiente no tema claro */
    --dark-gradient-start: #1A1A1A;  /* Cor inicial do gradiente no tema escuro */
    --dark-gradient-end: #333333;    /* Cor final do gradiente no tema escuro */
}
Licença
Este projeto é livre para uso pessoal e comercial.