package com.project.mybackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name ="estudiantes")

public class Estudiantes {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "apellido")
    private String apellido;

    @Column(name = "sexo")
    private String sexo;
   
    @Column(name = "edad")
    private int edad;

    @Column(name = "celular")
    private int celular;

    @Column(name = "distrito")
    private String distrito;
  
    @Column(name = "estado")
    private String estado;

    @ManyToOne
    @JoinColumn(name = "institucion_id", nullable = false)  // Clave foránea
    private Instituciones institucion;
    
}

