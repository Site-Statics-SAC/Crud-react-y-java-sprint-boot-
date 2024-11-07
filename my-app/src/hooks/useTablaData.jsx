// useTablaData.js
import { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import InstitucionService from '../services/InstitucionService';
import EstudianteService from '../services/EstudianteService';

const useTablaData = (token) => {
  const columnasEstudiantes = ['id', 'nombre', 'apellido', 'sexo', 'edad', 'celular', 'distrito', 'institucion', 'estado'];
  const columnasUsuarios = ['id', 'nombre', 'apellido', 'email', 'password', 'role'];
  const columnasInstituciones = ['id', 'nombre', 'grado', 'seccion', 'turno', 'nivelAcademico'];

  const [datosEstudiantes, setDatosEstudiantes] = useState([]);
  const [datosUsuarios, setDatosUsuarios] = useState([]);
  const [datosInstituciones, setDatosInstituciones] = useState([]);
  const [users, setUsers] = useState(datosUsuarios);

  const handleDelete = async (userId) => {
    try {
      await UserService.deleteUser(userId, token);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const [estudiantes, usuariosResponse, instituciones] = await Promise.all([
            EstudianteService.listarEstudiantes(),
            UserService.getAllUsers(token),
            InstitucionService.listarInstituciones(),
          ]);

          setDatosEstudiantes(estudiantes);
          setDatosUsuarios(usuariosResponse.ourUsersList);
          setDatosInstituciones(instituciones);
          setUsers(usuariosResponse.ourUsersList);
        }
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchData();
  }, [token]);

  return {
    datosEstudiantes,
    columnasEstudiantes,
    datosUsuarios,
    handleDelete,
    columnasUsuarios,
    datosInstituciones,
    columnasInstituciones,
  };
};

export default useTablaData;