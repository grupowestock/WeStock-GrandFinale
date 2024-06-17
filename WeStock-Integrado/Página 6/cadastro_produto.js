document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        document.getElementById('userName').innerHTML = `${usuario.nome}`;
    } else {
        window.location.href = 'login.html'; // Redireciona para a página de login se não houver usuário
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('usuario');
        window.location.href = 'login.html';
    });

    document.getElementById('cadastroProdutoForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const produto = {
            categoria: document.getElementById('categoria').value,
            quantidade: document.getElementById('quantidade').value,
            descricao: document.getElementById('descricao').value,
            codigoSku: document.getElementById('codigoSku').value,
            dataAquisicao: document.getElementById('dataAquisicao').value,
            preco: document.getElementById('preco').value,
            cor: document.getElementById('cor').value,
            peso: document.getElementById('peso').value,
            tamanho: document.getElementById('tamanho').value,
            imagem: document.getElementById('imagem').files[0] // Handling file upload
        };

        fetch('http://localhost:8080/api/produtos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        })
        .then(response => response.json())
        .then(data => {
            alert('Produto cadastrado com sucesso!');
            document.getElementById('cadastroProdutoForm').reset();
        })
        .catch(error => {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto.');
        });
    });

    document.getElementById('excluirButton').addEventListener('click', function() {
        const produtoId = prompt("Informe o ID do produto que deseja excluir:");
        if (produtoId) {
            fetch(`http://localhost:8080/api/produtos/${produtoId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    alert('Produto excluído com sucesso!');
                } else {
                    alert('Erro ao excluir produto.');
                }
            })
            .catch(error => {
                console.error('Erro ao excluir produto:', error);
                alert('Erro ao excluir produto.');
            });
        }
    });
});
