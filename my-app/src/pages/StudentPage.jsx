import React from 'react';
import Tabla from '../components/users/Tabla';
import useTablaData from '../hooks/useTablaData';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import ButtonWithModal from '../components/users/ButtonWithModal';

const StudentPage = () => {
    const token = localStorage.getItem('token');
  const { datosEstudiantes, columnasEstudiantes } = useTablaData(token);
  
  const fieldsFormulario3 = [
    { name: 'nombre', type: 'text' },
    { name: 'apellido', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'role', type: 'text' },
  ];


  return (
   <>
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
        <Sidebar />
        <div className='flex-1 overflow-auto relative z-10'>
          <Header title='Estudiantes' />
          <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
            {/* Renderiza la tabla de Estudiantes */}
            <ButtonWithModal buttonText="guardar estudiantes" fields={fieldsFormulario3} />
            <Tabla
        datos={ datosEstudiantes}
        columnas={columnasEstudiantes}
      />

            
          </main>
        </div>
      </div>
   </>
  )
}

export default StudentPage