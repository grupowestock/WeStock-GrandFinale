document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;

    fetch('http://localhost:8080/api/usuarios/verificar-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.exists) {
            // Armazenar o e-mail no localStorage para usar na próxima página
            localStorage.setItem('resetEmail', email);
            // Redirecionar para a página de redefinição de senha
            window.location.href = '../Página 9/Redefinir Senha Confirmacao.html';
        } else {
            alert('E-mail não encontrado.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Erro ao verificar e-mail.');
    });
});
