// src/services/InstitucionService.js

import axios from 'axios';

class InstitucionService {
    static API_URL = 'http://localhost:8082/api/v2/instituciones'; // Cambia el puerto si es necesario

    static async listarInstituciones() {
        try {
            const response = await axios.get(this.API_URL);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async guardarInstitucion(institucion) {
        try {
            const response = await axios.post(this.API_URL, institucion);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerInstitucionPorId(id) {
        try {
            const response = await axios.get(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async actualizarInstitucion(id, institucion) {
        try {
            const response = await axios.put(`${this.API_URL}/${id}`, institucion);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async eliminarInstitucion(id) {
        try {
            const response = await axios.delete(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default InstitucionService;
