document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8080/api/produtos';
    const produtoTableBody = document.getElementById('produtoTableBody');
    const cadastrarProdutoBtn = document.getElementById('cadastrarProduto');

    async function fetchProdutos() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Erro ao buscar produtos');
            }
            const produtos = await response.json();
            renderProdutos(produtos);
        } catch (error) {
            console.error('Erro:', error);
        }
    }

    function renderProdutos(produtos) {
        produtoTableBody.innerHTML = '';
        produtos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.id}</td>
                <td>${new Date(produto.dataAquisicao).toLocaleDateString()}</td>
                <td>${produto.descricao}</td>
                <td>${produto.categoria}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.codigoSku}</td>
                <td>${produto.tamanho}</td>
                <td>${produto.cor}</td>
                <td>${produto.peso}</td>
                <td>${produto.valor}</td>
            `;
            produtoTableBody.appendChild(row);
        });
    }

    cadastrarProdutoBtn.addEventListener('click', () => {
        window.location.href = '../Página 6/cadastro_produto.html'; // Redireciona para a página de cadastro
    });

    fetchProdutos();
});
