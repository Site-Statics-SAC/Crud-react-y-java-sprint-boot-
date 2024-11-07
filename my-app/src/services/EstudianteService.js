import axios from 'axios';

class EstudianteService {
    static API_URL = 'http://localhost:8082/api/v1/estudiantes'; // Cambia el puerto si es necesario

    static async listarEstudiantes() {
        try {
            const response = await axios.get(this.API_URL);
            return response.data;
        } catch (err) {
            console.error("Error en listarEstudiantes:", err);
            throw new Error('Hubo un problema al obtener los estudiantes');
        }
    }

    static async guardarEstudiante(estudiante) {
        try {
            const response = await axios.post(this.API_URL, estudiante);
            return response.data;
        } catch (err) {
            console.error("Error en guardarEstudiante:", err);
            throw new Error('Hubo un problema al guardar el estudiante');
        }
    }

    static async obtenerEstudiantePorId(id) {
        try {
            const response = await axios.get(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            console.error(`Error en obtenerEstudiantePorId con id ${id}:`, err);
            throw new Error('Hubo un problema al obtener el estudiante por ID');
        }
    }

    static async actualizarEstudiante(id, estudiante) {
        try {
            const response = await axios.put(`${this.API_URL}/${id}`, estudiante);
            return response.data;
        } catch (err) {
            console.error(`Error en actualizarEstudiante con id ${id}:`, err);
            throw new Error('Hubo un problema al actualizar el estudiante');
        }
    }

    static async eliminarEstudiante(id) {
        try {
            const response = await axios.delete(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            console.error(`Error en eliminarEstudiante con id ${id}:`, err);
            throw new Error('Hubo un problema al eliminar el estudiante');
        }
    }

    static async listarEstudiantesDuplicados() {
        try {
            const response = await axios.get(`${this.API_URL}/duplicados`);
            return response.data;
        } catch (err) {
            console.error("Error en listarEstudiantesDuplicados:", err);
            throw new Error('Hubo un problema al obtener los estudiantes duplicados');
        }
    }
}

export default EstudianteService;
