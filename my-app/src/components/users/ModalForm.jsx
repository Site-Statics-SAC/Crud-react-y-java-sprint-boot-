import React from 'react';

function ModalForm({ isOpen, onClose, onSubmit, fields = [] }) {  // Asegura que `fields` sea un arreglo vacío si no se proporciona
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Formulario</h2>
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          {fields.length > 0 ? (
            fields.map((field) => (
              <label key={field.name} className="flex flex-col text-gray-700 font-medium">
                {field.name.charAt(0).toUpperCase() + field.name.slice(1)}:
                <input
                  type={field.type || "text"}
                  name={field.name}
                  required
                  className="border border-gray-400 rounded-md p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
            ))
          ) : (
            <p className="text-gray-500">No hay campos disponibles.</p>
          )}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-400"
            >
              Cerrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
