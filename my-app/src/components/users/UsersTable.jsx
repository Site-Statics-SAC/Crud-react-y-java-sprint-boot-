
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import HookTable from "./hooks/HookTable";
import Modal from 'react-modal';

Modal.setAppElement('#root');

const UsersTable = () => {
    const {
        searchTerm,
        filteredUsers,
        selectedUser,
        isModalOpen,
        handleSearch,
        handleDelete,
        openModal,
        closeModal,
        handleInputChange,
        updateUser,
        createUser
    } = HookTable();

    const openCreateModal = () => {
        openModal();
    };

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
                        onClick={openCreateModal}
                    >
                        Agregar Usuario
                    </button>
                    <div className='relative'>
                        <input
                            type='text'
                            placeholder='Buscar usuarios...'
                            className='bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
                    </div>
                </div>
            </div>

            <div className='overflow-x-auto'>
            <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{user.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{user.nombre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{user.apellido}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-200">
                            <button className="text-red-500 hover:text-red-700 mr-4" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            <button className="text-blue-500 hover:text-blue-700" onClick={() => openModal(user)}>Actualizar</button>
                        </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan="6" className="text-center">No hay usuarios disponibles.</td>
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
                ariaHideApp={false}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{selectedUser?.id ? 'Actualizar Usuario' : 'Agregar Usuario'}</h2>
                    <button onClick={closeModal} className="text-gray-500 hover:text-gray-800">X</button>
                </div>
                <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    if (selectedUser?.id) {
                        updateUser();
                    } else {
                        createUser();
                    }
                }}>
                    <label className="block">
                        <span className="text-gray-700">Nombre:</span>
                        <input
                            type="text"
                            name="nombre"
                            value={selectedUser?.nombre || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Apellido:</span>
                        <input
                            type="text"
                            name="apellido"
                            value={selectedUser?.apellido || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={selectedUser?.email || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Contraseña:</span>
                        <input
                            type="password"
                            name="password"
                            value={selectedUser?.password || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Rol:</span>
                        <select
                            name="role"
                            value={selectedUser?.role || ""}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                            required
                        >
                            <option value="">Seleccione un rol</option>
                            <option value="ADMIN">Admin</option>
                            <option value="USER">User</option>
                        </select>
                    </label>
                    <button type="submit" className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
                        {selectedUser?.id ? 'Actualizar' : 'Agregar'}
                    </button>
                </form>
            </Modal>
        </motion.div>
    );
};

export default UsersTable;
