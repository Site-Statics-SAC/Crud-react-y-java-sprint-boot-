package com.project.mybackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.mybackend.model.Estudiantes;

public interface EstudianteRepository extends JpaRepository<Estudiantes,Long> {

    @Query("SELECT e FROM Estudiantes e WHERE (e.nombre, e.apellido) IN (" +
           "SELECT e2.nombre, e2.apellido FROM Estudiantes e2 " +
           "GROUP BY e2.nombre, e2.apellido HAVING COUNT(e2) > 1)")
    List<Estudiantes> findDuplicatedEstudiantes();
    

}
