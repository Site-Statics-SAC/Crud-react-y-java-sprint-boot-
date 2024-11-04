package com.project.mybackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.mybackend.model.Estudiantes;
import com.project.mybackend.model.Instituciones;
import com.project.mybackend.repository.EstudianteRepository;
import com.project.mybackend.repository.InstitucionRepository;
import com.project.mybackend.service.EstudianteService;



@RestController
@RequestMapping("/api/v1")
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudiantesRepository;

    @Autowired
    private InstitucionRepository institucionRepository;
    
    @Autowired
    private EstudianteService estudianteService; // Inyectar el servicio
    
    @GetMapping("/estudiantes")
    public List<Estudiantes> listarEstudiantes() {
        return estudiantesRepository.findAll();
    }
    
    @GetMapping("/estudiantes/duplicados") // Nuevo endpoint para obtener estudiantes duplicados
    public ResponseEntity<List<Estudiantes>> listarEstudiantesDuplicados() {
        List<Estudiantes> duplicados = estudianteService.getDuplicatedEstudiantes();
        return ResponseEntity.ok(duplicados);
    }

    @PostMapping("/estudiantes")
    public ResponseEntity<Estudiantes> guardarEstudiantes(@RequestBody Estudiantes estudiantes) {
        // Verificar si la institución existe
        Instituciones institucionExistente = institucionRepository.findById(estudiantes.getInstitucion().getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "La institución con ese ID no fue encontrada: " + estudiantes.getInstitucion().getId()));

        // Asignar la institución al estudiante
        estudiantes.setInstitucion(institucionExistente);

        // Guardar el estudiante
        Estudiantes nuevoEstudiante = estudiantesRepository.save(estudiantes);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevoEstudiante);
    }


    @GetMapping("/estudiantes/{id}")
    public ResponseEntity<Estudiantes> listarEstudiantes(@PathVariable Long id) {
        Estudiantes estudiantes = estudiantesRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
            "El estudiante con ese ID no fue encontrado: " + id));
        
        // Aquí automáticamente incluirá la información de la institución debido a la relación ManyToOne
        return ResponseEntity.ok(estudiantes);
    }
    
    @PutMapping("/estudiantes/{id}")
    public ResponseEntity<Estudiantes> actualizarEstudiantes(@PathVariable Long id, @RequestBody Estudiantes estudiantesRequest) {
        // Buscar el estudiante existente
        Estudiantes estudiantes = estudiantesRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
            "El estudiante con ese ID no fue encontrado: " + id));
    
        // Actualizar los detalles del estudiante
        estudiantes.setNombre(estudiantesRequest.getNombre());
        estudiantes.setApellido(estudiantesRequest.getApellido());
        estudiantes.setSexo(estudiantesRequest.getSexo());
        estudiantes.setEdad(estudiantesRequest.getEdad());
        estudiantes.setCelular(estudiantesRequest.getCelular());
        estudiantes.setDistrito(estudiantesRequest.getDistrito());
        estudiantes.setEstado(estudiantesRequest.getEstado());
    
        // Verificar si la nueva institución existe, si es que se desea actualizar
        if (estudiantesRequest.getInstitucion() != null) {
            Instituciones nuevaInstitucion = institucionRepository.findById(estudiantesRequest.getInstitucion().getId())
                .orElseThrow(() -> new ResourceNotFoundException("La institución con ese ID no fue encontrada: " + estudiantesRequest.getInstitucion().getId()));
            
            // Asignar la nueva institución al estudiante
            estudiantes.setInstitucion(nuevaInstitucion);
        }
    
        // Guardar el estudiante actualizado
        Estudiantes estudiantesActualizado = estudiantesRepository.save(estudiantes);
        return ResponseEntity.ok(estudiantesActualizado);
    }
    

    @DeleteMapping("/estudiantes/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarEstudiantes(@PathVariable Long id) {
        Estudiantes estudiantes = estudiantesRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
            "El estudiante con ese ID no fue encontrado: " + id));
        
        estudiantesRepository.delete(estudiantes);
        Map<String, Boolean> response = new HashMap<>();
        response.put("delete", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
