package com.project.mybackend.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.project.mybackend.model.Usuarios;

import java.util.Optional;
public interface  UsuarioRepository extends JpaRepository<Usuarios, Long> {

    Optional<Usuarios> findByEmail(String email);
}