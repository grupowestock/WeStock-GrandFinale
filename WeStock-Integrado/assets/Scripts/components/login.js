document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        email: email,
        senha: password
    };

    console.log('Sending login request:', user);

    fetch('http://localhost:8080/api/usuarios/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log('Received response:', response);
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(data => {
                console.error('Server error:', data);
                throw new Error(data.message || 'Erro ao realizar login.');
            });
        }
    })
    .then(data => {
        console.log('Login successful:', data);
        alert('Login realizado com sucesso!');
        localStorage.setItem('usuario', JSON.stringify(data));
        window.location.href = '../Página 4/dashboard.html';
    })
    .catch(error => {
        console.error('Fetch error:', error);
        if (error.message === 'Failed to fetch') {
            alert('Erro: Não foi possível conectar ao servidor. Por favor, verifique sua conexão com a internet ou tente novamente mais tarde.');
        } else {
            alert('Erro: ' + error.message);
        }
    });
});
