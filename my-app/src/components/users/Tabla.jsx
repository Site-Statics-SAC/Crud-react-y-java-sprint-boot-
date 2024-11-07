import React from 'react';
import { motion } from 'framer-motion';
import ButtonWithModal from './ButtonWithModal'; // Asegúrate de importar este componente

const Tabla = ({ datos = [], columnas = [], onDelete }) => {
  const fieldsFormulario2 = [
    { name: 'nombre', type: 'text' },
    { name: 'apellido', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'role', type: 'text' },
  ];

  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-700 text-gray-100">
              {columnas.map((columna) => (
                <th key={columna} className="px-4 py-2 text-left text-sm font-semibold">
                  {columna}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-sm font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(datos) && datos.length > 0 ? (
              datos.map((fila, index) => (
                <tr key={index} className="hover:bg-gray-600 transition-colors">
                  {columnas.map((columna) => (
                    <td key={columna} className="px-4 py-2 text-sm text-gray-200">
                      {columna === 'institucion' && typeof fila[columna] === 'object' && fila[columna] !== null
                        ? `${fila[columna].nombre} (Grado: ${fila[columna].grado}, Sección: ${fila[columna].seccion}, Turno: ${fila[columna].turno}, Nivel Académico: ${fila[columna].nivelAcademico})`
                        : fila[columna]}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-sm text-gray-200 flex space-x-2">
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => onDelete(fila.id)} // Llamada a la función de eliminar
                    >
                      Eliminar
                    </button>
                    <ButtonWithModal
                      buttonText="Actualizar"
                      fields={fieldsFormulario2}
                      data={fila} // Pasa la fila actual para editar
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columnas.length + 1} className="text-center text-gray-400 py-4">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default Tabla;
