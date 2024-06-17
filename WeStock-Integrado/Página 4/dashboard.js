document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.nome) {
        document.getElementById('welcomeMessage').innerHTML = `Olá, ${usuario.nome} <span class="wave">👋</span>`;
        document.getElementById('userName').innerHTML = `${usuario.nome} <i class="bi bi-person-circle"></i>`;
    } else {
        //window.location.href = '../Página 2/boas-vindas.html'; // Redireciona para a página de login se não houver usuário
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('usuario');
        window.location.href = '../Página 2/boas-vindas.html';
    });
});
