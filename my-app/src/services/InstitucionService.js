import axios from 'axios';

class InstitucionService {
    static API_URL = 'http://localhost:8082/api/v2/instituciones'; // Cambia el puerto si es necesario

    static async listarInstituciones() {
        try {
            const response = await axios.get(this.API_URL);
            return response.data;
        } catch (err) {
            console.error("Error en listarInstituciones:", err);
            throw new Error('Hubo un problema al obtener las instituciones');
        }
    }

    static async guardarInstitucion(institucion) {
        try {
            const response = await axios.post(this.API_URL, institucion);
            return response.data;
        } catch (err) {
            console.error("Error en guardarInstitucion:", err);
            throw new Error('Hubo un problema al guardar la institución');
        }
    }

    static async obtenerInstitucionPorId(id) {
        try {
            const response = await axios.get(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            console.error(`Error en obtenerInstitucionPorId con id ${id}:`, err);
            throw new Error('Hubo un problema al obtener la institución por ID');
        }
    }

    static async actualizarInstitucion(id, institucion) {
        try {
            const response = await axios.put(`${this.API_URL}/${id}`, institucion);
            return response.data;
        } catch (err) {
            console.error(`Error en actualizarInstitucion con id ${id}:`, err);
            throw new Error('Hubo un problema al actualizar la institución');
        }
    }

    static async eliminarInstitucion(id) {
        try {
            const response = await axios.delete(`${this.API_URL}/${id}`);
            return response.data;
        } catch (err) {
            console.error(`Error en eliminarInstitucion con id ${id}:`, err);
            throw new Error('Hubo un problema al eliminar la institución');
        }
    }
}

export default InstitucionService;
