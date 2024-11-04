package com.project.mybackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.mybackend.model.Instituciones;

public interface InstitucionRepository extends JpaRepository<Instituciones, Long> {
    
}
