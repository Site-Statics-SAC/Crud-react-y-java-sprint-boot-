import { useState, useEffect } from 'react';
import UserService from '../../../services/UserService'; // Asegúrate de importar correctamente tu servicio

const HookTable = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
       // Asegúrate de que la lista de usuarios tenga IDs únicos
const fetchUsers = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await UserService.getAllUsers(token);
        
        console.log("Lista de usuarios:", response.ourUsersList); // Para verificar los IDs
        
        // Verifica que la lista tenga IDs únicos
        const uniqueUsers = [...new Map(response.ourUsersList.map(user => [user.id, user])).values()];

        setUsers(uniqueUsers);
        setFilteredUsers(uniqueUsers);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};


        fetchUsers();
    }, []);

    useEffect(() => {
        console.log(filteredUsers); // Agrega esto para verificar los usuarios filtrados
    }, [filteredUsers]);

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
    
        // Filtra los usuarios
        const filtered = users.filter(
            (user) => user.nombre.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
        );
    
        console.log("Término de búsqueda:", term); // Para verificar el término
        console.log("Usuarios filtrados:", filtered); // Para verificar los usuarios filtrados
    
        setFilteredUsers(filtered);
    };
    
    const openModal = (user = null) => {
        setSelectedUser(user);
        setIsModalOpen(true);
        
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser((prev) => ({ ...prev, [name]: value }));
    };

    const updateUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await UserService.updateUser(selectedUser.id, selectedUser, token);
    
            // Asegúrate de que la respuesta contenga el nuevo rol
            if (response.ourUsers && response.ourUsers.role) {
                localStorage.setItem('role', response.ourUsers.role); // Actualiza el rol en el almacenamiento local
            }
    
            const updatedUsers = users.map((user) => (user.id === selectedUser.id ? { ...user, ...selectedUser } : user));
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            closeModal();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    const createUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const newUser = { ...selectedUser }; // Copia el usuario seleccionado
            const response = await UserService.register(newUser, token); // Espera la respuesta del servidor
            
            console.log("Respuesta del servidor:", response); // Verifica la respuesta completa
    
            // Accede al usuario recién creado desde la respuesta
            const createdUser = response.ourUsers; // Asegúrate de acceder a la propiedad correcta
            
            if (createdUser && createdUser.id) {
                setUsers((prev) => [...prev, createdUser]); // Agrega el nuevo usuario a la lista
                setFilteredUsers((prev) => [...prev, createdUser]); // Actualiza la lista filtrada
            } else {
                console.error("El usuario creado no contiene un ID válido");
            }
    
            closeModal(); // Cierra el modal
        } catch (error) {
            console.error("Error creando usuario:", error);
        }
    };
    
    
    const handleDelete = async (userId) => {
        try {
            const token = localStorage.getItem('token');
            await UserService.deleteUser(userId, token);
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return {
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
        createUser, // Asegúrate de exportar la función de crear usuario
    };
};

export default HookTable;
