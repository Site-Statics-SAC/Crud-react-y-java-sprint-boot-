package com.project.mybackend.model;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name ="instituciones")

public class Instituciones {

    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "grado")
    private int grado;

    @Column(name = "seccion")
    private String seccion;
   
    @Column(name = "turno")
    private String turno;

    @Column(name = "nivelAcademico")
    private String nivelAcademico;

    
}
