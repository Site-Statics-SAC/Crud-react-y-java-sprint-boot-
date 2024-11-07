import React from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';
import Tabla from '../components/users/Tabla';
import useTablaData from '../hooks/useTablaData';
import ButtonWithModal from '../components/users/ButtonWithModal';

const UsersPage = () => {
  const token = localStorage.getItem('token');
  const { datosUsuarios, columnasUsuarios, handleDelete } = useTablaData(token);


  const fieldsFormulario2 = [
    { name: 'nombre', type: 'text' },
    { name: 'apellido', type: 'text' },
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
    { name: 'role', type: 'text' },
  ];

  return (
    <div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
      <Sidebar />
      <div className='flex-1 overflow-auto relative z-10'>
        <Header title='Users' />
        <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
          <ButtonWithModal buttonText="guardar usuarios" fields={fieldsFormulario2} />
          <ButtonWithModal buttonText=" actualizar usuarios" fields={fieldsFormulario2} />
          <Tabla
        datos={datosUsuarios}
        columnas={columnasUsuarios}
        onDelete={handleDelete} // Pasa la función de eliminar
      />
        </main>
      </div>
    </div>
  );
};

export default UsersPage;