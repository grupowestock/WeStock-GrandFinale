function cadastrarUsuario() {
    // Obter os valores dos campos do formulário
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const celular = document.getElementById('celular').value;
    const senha = document.getElementById('senha').value;
    const repetirSenha = document.getElementById('repetir-senha').value;

    // Validar se as senhas são iguais
    if (senha !== repetirSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Criar um objeto com os dados do usuário
    const usuario = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        celular: celular,
        senha: senha
    };

    // Enviar a requisição para a API
    fetch('http://localhost:8080/api/usuarios/cadastrar', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            //'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => {
        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');
            document.getElementById('createAccountForm').reset(); // Resetar form após submissão bem sucedida
            window.location.href = "../Página 4/dashboard.html"; // Redirecionamento após submissão bem-sucedida
        } else {
            return response.json().then(data => {
                throw new Error(data.message || 'Erro ao cadastrar usuário.');
            });
        }
    })
    .catch(error => {
        alert('Erro: ' + error.message);
    });
}
