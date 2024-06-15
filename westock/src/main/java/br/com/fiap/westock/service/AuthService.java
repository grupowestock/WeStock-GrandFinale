package br.com.fiap.westock.service;

import br.com.fiap.westock.model.Usuario;
import br.com.fiap.westock.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    private Usuario usuarioAutenticado;

    public Usuario login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmailAndSenha(email, senha);
        if (usuario != null) {
            usuarioAutenticado = usuario;
        }
        return usuario;
    }

    public Usuario getUsuarioAutenticado() {
        return usuarioAutenticado;
    }

    public void logout() {
        usuarioAutenticado = null;
    }
}
