import React from 'react';
import { motion } from 'framer-motion';
import { Search } from "lucide-react";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Tabla = ({
  datos = [],
  columnas = [],
  onDelete,
  onSearch,
  searchTerm,
  filteredData,
  openModal,
  closeModal,
  selectedUser,
  handleInputChange,
  updateUser,
  createUser,
  isModalOpen
}) => {
  return (
    <motion.div
      className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-gray-100'>Usuarios</h2>
        <div className='flex items-center'>
          <button
            className='bg-green-500 text-white rounded-lg px-4 py-2 mr-4 hover:bg-green-700'
            onClick={openModal}
          >
            Agregar Usuario
          </button>
          <div className='relative'>
            <input
              type='text'
              placeholder='Buscar usuarios...'
              className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={searchTerm}
              onChange={onSearch}
            />
            <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
          </div>
        </div>
      </div>

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
            {filteredData.length > 0 ? (
              filteredData.map((fila, index) => (
                <tr key={index} className="hover:bg-gray-600 transition-colors">
                  {columnas.map((columna) => (
                    <td key={columna} className="px-4 py-2 text-sm text-gray-200">
                      {fila[columna]}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-sm text-gray-200">
                    <button className="text-red-500 hover:text-red-700 mr-4" onClick={() => onDelete(fila.id)}>
                      Eliminar
                    </button>
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(fila)}>
                      Actualizar
                    </button>
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

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Actualizar Usuario"
        className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6 border border-gray-300 transform transition-all sm:max-w-lg"
        overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-75 z-50 flex justify-center items-center"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">{selectedUser?.id ? 'Actualizar Usuario' : 'Agregar Usuario'}</h2>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">X</button>
        </div>
        <form className="space-y-4" onSubmit={(e) => {
          e.preventDefault();
          selectedUser?.id ? updateUser() : createUser();
        }}>
          {/* Campos del formulario */}
        </form>
      </Modal>
    </motion.div>
  );
};

export default Tabla;
