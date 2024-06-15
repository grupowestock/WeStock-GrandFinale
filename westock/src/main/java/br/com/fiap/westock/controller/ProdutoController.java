package br.com.fiap.westock.controller;

import br.com.fiap.westock.model.Produto;
import br.com.fiap.westock.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping
    public List<Produto> listarProdutos() {
        return produtoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Produto buscarProduto(@PathVariable Long id) {
        return produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
    }

    @PostMapping
    public Produto adicionarProduto(@RequestBody Produto produto) {
        return produtoRepository.save(produto);
    }

    @PutMapping("/{id}")
    public Produto atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
        Produto produto = produtoRepository.findById(id).orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produto.setCategoria(produtoAtualizado.getCategoria());
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setDataAquisicao(produtoAtualizado.getDataAquisicao());
        produto.setCor(produtoAtualizado.getCor());
        produto.setTamanho(produtoAtualizado.getTamanho());
        produto.setQuantidade(produtoAtualizado.getQuantidade());
        produto.setCodigoSku(produtoAtualizado.getCodigoSku());
        produto.setPreco(produtoAtualizado.getPreco());
        produto.setPeso(produtoAtualizado.getPeso());
        produto.setImagem(produtoAtualizado.getImagem());
        return produtoRepository.save(produto);
    }

    @DeleteMapping("/{id}")
    public void deletarProduto(@PathVariable Long id) {
        produtoRepository.deleteById(id);
    }

    @GetMapping("/ultimos/{userId}")
    public List<Produto> buscarUltimosProdutos(@PathVariable Long userId) {
        return produtoRepository.findUltimosProdutosByUserId(userId);
    }

    @GetMapping("/usuario/{userId}")
    public List<Produto> buscarProdutosPorUsuario(@PathVariable Long userId) {
        return produtoRepository.findProdutosByUserId(userId);
    }
}
