document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const senha = document.getElementById('senha').value;
    const repetirSenha = document.getElementById('repetirSenha').value;
    const email = localStorage.getItem('resetEmail');

    if (senha !== repetirSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    fetch('http://localhost:8080/api/usuarios/redefinir-senha', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
    })
    .then(response => response.json())
    .then(data => {
        alert('Senha redefinida com sucesso!');
        window.location.href = '../Página 2/boas-vindas.html';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao redefinir senha.');
    });
});
