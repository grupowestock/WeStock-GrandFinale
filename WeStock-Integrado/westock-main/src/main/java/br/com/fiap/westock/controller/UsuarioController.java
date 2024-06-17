package br.com.fiap.westock.controller;

import br.com.fiap.westock.model.LoginRequest;
import br.com.fiap.westock.model.Usuario;
import br.com.fiap.westock.repository.UsuarioRepository;
import br.com.fiap.westock.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private AuthService authService;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{id}")
    public Usuario buscarUsuario(@PathVariable Long id) {
        return usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }

    @PostMapping
    public Usuario adicionarUsuario(@RequestBody Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
        Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        usuario.setNome(usuarioAtualizado.getNome());
        usuario.setSobrenome(usuarioAtualizado.getSobrenome());
        usuario.setEmail(usuarioAtualizado.getEmail());
        usuario.setCelular(usuarioAtualizado.getCelular());
        usuario.setSenha(usuarioAtualizado.getSenha());
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        usuarioRepository.deleteById(id);
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Usuario usuario = authService.login(loginRequest.getEmail(), loginRequest.getSenha());
        if (usuario != null) {
            session.setAttribute("usuario", usuario);
        }
        return usuario;
    }

    @GetMapping("/me")
    public Usuario getUsuarioAutenticado(HttpSession session) {
        return (Usuario) session.getAttribute("usuario");
    }

    @GetMapping("/validateEmail")
    public boolean validateEmail(@RequestParam String email) {
        return usuarioRepository.existsByEmail(email);
    }

    @PostMapping("/redefinirSenha")
    public void redefinirSenha(@RequestParam String email, @RequestParam String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario != null) {
            usuario.setSenha(senha);
            usuarioRepository.save(usuario);
        } else {
            throw new RuntimeException("Usuário não encontrado");
        }
    }

    @PostMapping("/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}
