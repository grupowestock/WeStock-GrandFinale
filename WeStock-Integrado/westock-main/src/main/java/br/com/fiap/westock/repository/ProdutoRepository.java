package br.com.fiap.westock.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.fiap.westock.model.Produto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.util.List;
import java.util.Optional;

@Service
public class ProdutoRepository {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Produto> findAll() {
        TypedQuery<Produto> query = entityManager.createQuery("SELECT p FROM Produto p", Produto.class);
        return query.getResultList();
    }

    public Optional<Produto> findById(Long id) {
        Produto produto = entityManager.find(Produto.class, id);
        return produto != null ? Optional.of(produto) : Optional.empty();
    }

    public Produto save(Produto produto) {
        if (produto.getId() == null) {
            entityManager.persist(produto);
            return produto;
        } else {
            return entityManager.merge(produto);
        }
    }

    public void deleteById(Long id) {
        Produto produto = entityManager.find(Produto.class, id);
        if (produto != null) {
            entityManager.remove(produto);
        }
    }

    public List<Produto> findUltimosProdutosByUserId(Long userId) {
        TypedQuery<Produto> query = entityManager.createQuery(
            "SELECT p FROM Produto p WHERE p.userId = :userId ORDER BY p.dataAquisicao DESC", Produto.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    public List<Produto> findProdutosByUserId(Long userId) {
        TypedQuery<Produto> query = entityManager.createQuery(
            "SELECT p FROM Produto p WHERE p.userId = :userId", Produto.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
}
