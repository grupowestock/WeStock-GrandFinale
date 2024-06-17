document.addEventListener('DOMContentLoaded', function() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        document.getElementById('inputNome').value = usuario.nome || '';
        document.getElementById('inputSobrenome').value = usuario.sobrenome || '';
        document.getElementById('inputCelular').value = usuario.celular || '';
        document.getElementById('inputEmail').value = usuario.email || '';
        document.getElementById('userName').innerHTML = `${usuario.nome}`;
    } else {
        window.location.href = '../Página2/boas-vindas.html'; // Redireciona para a página de login se não houver usuário
    }

    document.getElementById('logoutButton').addEventListener('click', function() {
        localStorage.removeItem('usuario');
        window.location.href = '../Página2/boas-vindas.html';
    });

    document.getElementById('profileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const updatedUsuario = {
            nome: document.getElementById('inputNome').value,
            sobrenome: document.getElementById('inputSobrenome').value,
            celular: document.getElementById('inputCelular').value,
            email: document.getElementById('inputEmail').value,
            senha: usuario.senha // Mantenha a senha antiga
        };

        fetch(`http://localhost:8080/api/usuarios/${usuario.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUsuario)
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('usuario', JSON.stringify(data));
            alert('Perfil atualizado com sucesso!');
        })
        .catch(error => {
            console.error('Erro ao atualizar perfil:', error);
            alert('Erro ao atualizar perfil.');
        });
    });
});
