// src/services/EstudianteService.js

import axios from 'axios';

class EstudianteService {
    static API_URL = 'http://localhost:8082/api/v1/estudiantes'; // Cambia el puerto si es necesario

    static async listarEstudiantes() {
        try {
            const response = await axios.get(this.API_URL);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async guardarEstudiante(estudiante) {
        try {
            const response = await axios.post(this.API_URL, estudiante);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerEstudiantePorId(id) {
        try {
            const response = await axios.get(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async actualizarEstudiante(id, estudiante) {
        try {
            const response = await axios.put(`${this.API_URL}/${id}`, estudiante);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async eliminarEstudiante(id) {
        try {
            const response = await axios.delete(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async listarEstudiantesDuplicados() {
        try {
            const response = await axios.get(`${this.API_URL}/duplicados`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default EstudianteService;
