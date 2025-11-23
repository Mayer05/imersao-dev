const cardContainer = document.querySelector(".card-container");
const campoBusca = document.getElementById("caixa-busca");
let todosOsFilmes = []; // Armazena todos os filmes carregados do JSON

// Função para filtrar os dados com base no termo de busca
function filtrarDados() {
    const termoBusca = campoBusca.value.trim().toLowerCase();
    
    // Se o campo de busca estiver vazio, renderiza todos os filmes
    if (termoBusca === "") {
        renderizarCards(todosOsFilmes);
        return;
    } 
    
    const dadosFiltrados = todosOsFilmes.filter(filme => {
        const buscaPorNome = filme.nome.toLowerCase().includes(termoBusca);
        const buscaPorDescricao = filme.descricao.toLowerCase().includes(termoBusca);
        const buscaPorTags = filme.tags.join(' ').toLowerCase().includes(termoBusca);
        
        // Verifica se a tag exata existe no array de tags do filme
        // const buscaPorTag = filme.tags.some(tag => tag.toLowerCase() === termoBusca);
        
        return buscaPorNome || buscaPorDescricao || buscaPorTags;
    });
    
    renderizarCards(dadosFiltrados);
}

// Função para renderizar os cards na tela
function renderizarCards(filmes) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    
    if (filmes.length === 0) {
        cardContainer.innerHTML = `<p class="mensagem-container">Nenhum resultado encontrado.</p>`;
        return;
    }

    for (const filme of filmes) {
        const article = document.createElement("article");
        article.classList.add("card");

        article.innerHTML = `
            <h2>${filme.nome}</h2>
            <p class="ano-criacao">${filme.ano_criacao || 'Ano não informado'}</p>
            <p>${filme.descricao}</p>
            <a href="${filme.link_oficial}" target="_blank">Saiba mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

// Função principal para iniciar a aplicação
async function inicializar() {
    try {
        const resposta = await fetch("data.json");
        todosOsFilmes = await resposta.json();
        renderizarCards(todosOsFilmes); // Renderiza todos os filmes inicialmente
        campoBusca.addEventListener("input", filtrarDados); // Busca ao digitar
    } catch (error) {
        console.error("Falha ao carregar e inicializar os dados:", error);
        cardContainer.innerHTML = `<p class="mensagem-container">Ocorreu um erro ao carregar os filmes. Tente novamente mais tarde.</p>`;
    }
}

// Inicia a aplicação
inicializar();
