package com.project.mybackend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.mybackend.model.Estudiantes;
import com.project.mybackend.repository.EstudianteRepository;

import java.util.List;

@Service
public class EstudianteService {

    @Autowired
    private EstudianteRepository estudianteRepository;

    public List<Estudiantes> getDuplicatedEstudiantes() {
        return estudianteRepository.findDuplicatedEstudiantes();
    }
}
