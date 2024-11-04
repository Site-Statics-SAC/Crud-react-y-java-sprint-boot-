package com.project.mybackend.controller;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.mybackend.model.Instituciones;
import com.project.mybackend.repository.InstitucionRepository;


@RestController
@RequestMapping("/api/v2")
public class InstitucionController {

    @Autowired
    private InstitucionRepository institucionesRepository;


    // Listar todas las instituciones
    @GetMapping("/instituciones")
    public List<Instituciones> listarInstituciones() {
        return institucionesRepository.findAll();
    }


    // Guardar una nueva institución
    @PostMapping("/instituciones")
    public Instituciones guardarInstitucion(@RequestBody Instituciones institucion) {
        return institucionesRepository.save(institucion);
    }

    // Obtener una institución por ID
    @GetMapping("/instituciones/{id}")
    public ResponseEntity<Instituciones> obtenerInstitucionPorId(@PathVariable Long id) {
        Instituciones institucion = institucionesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La institución con ese ID no fue encontrada: " + id));
        return ResponseEntity.ok(institucion);
    }

    // Actualizar una institución
    @PutMapping("/instituciones/{id}")
    public ResponseEntity<Instituciones> actualizarInstitucion(@PathVariable Long id, @RequestBody Instituciones institucionRequest) {
        Instituciones institucion = institucionesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La institución con ese ID no fue encontrada: " + id));

        institucion.setNombre(institucionRequest.getNombre());
        institucion.setGrado(institucionRequest.getGrado());
        institucion.setSeccion(institucionRequest.getSeccion());
        institucion.setTurno(institucionRequest.getTurno());
        institucion.setNivelAcademico(institucionRequest.getNivelAcademico());

        Instituciones institucionActualizada = institucionesRepository.save(institucion);
        return ResponseEntity.ok(institucionActualizada);
    }

    // Eliminar una institución por ID
    @DeleteMapping("/instituciones/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarInstitucion(@PathVariable Long id) {
        Instituciones institucion = institucionesRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La institución con ese ID no fue encontrada: " + id));

        institucionesRepository.delete(institucion);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}