

import React from 'react';
import Tabla from '../components/users/Tabla';
import useTablaData from '../hooks/useTablaData';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import ButtonWithModal from '../components/users/ButtonWithModal';

const InstitucionPage = () => {
  const token = localStorage.getItem('token');
  const { datosInstituciones, columnasInstituciones } = useTablaData(token);
   // Define los campos para cada formulario
   const fieldsFormulario1 = [
    { name: 'nombre', type: 'text' },
    { name: 'apellido', type: 'text' },
  ];


  return (
    <>
      <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <Sidebar />
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='Instituciones' />
          <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
            {/* Renderiza la tabla de instituciones */}
            <ButtonWithModal buttonText="actualizar instituciones" fields={fieldsFormulario1} />
            <ButtonWithModal buttonText="agregar instituciones" fields={fieldsFormulario1} />
            <Tabla 
              datos={datosInstituciones} 
              columnas={columnasInstituciones} 
            />
          </main>
        </div>
      </div>
    </>
  );
}

export default InstitucionPage;
