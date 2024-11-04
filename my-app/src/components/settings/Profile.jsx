import { useEffect, useState } from "react";
import { User } from "lucide-react";
import UserService from "../../services/UserService";
import SettingSection from "./SettingSection";

const Profile = () => {
	// Estado para almacenar los datos del perfil del usuario
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Obtener el perfil del usuario cuando el componente se monta
	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const token = localStorage.getItem('token'); // Obtener el token del almacenamiento local
				if (token) {
					const data = await UserService.getYourProfile(token);

					// Verificar si los datos tienen la estructura esperada
					if (data && data.statusCode === 200 && data.ourUsers) {
						setProfile(data.ourUsers); // Usar ourUsers como los datos del perfil
					} else {
						setError("Los datos del perfil no tienen el formato esperado.");
						console.error("Formato de datos del perfil inesperado:", data);
					}
				} else {
					setError("No se encontró un token. Por favor, inicia sesión.");
				}
			} catch (err) {
				// Mostrar el error exacto en la consola
				setError("No se pudieron cargar los datos del perfil. Revisa la consola para más detalles.");
				console.error("Error al obtener el perfil:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProfile();
	}, []);

	// Renderizar carga, error o datos del perfil
	if (loading) {
		return <div>Cargando...</div>;
	}

	if (error) {
		return <div className='text-red-500'>{error}</div>;
	}

	return (
		<SettingSection icon={User} title={"Perfil"}>
			{profile && (
				<div className='flex flex-col sm:flex-row items-center mb-6'>
					<img
						src={profile.avatar || 'https://randomuser.me/api/portraits/men/3.jpg'} // Usar avatar de la API o uno predeterminado
						alt='Perfil'
						className='rounded-full w-20 h-20 object-cover mr-4'
					/>
					<div>
						<h3 className='text-lg font-semibold text-gray-100'>Mi nombre:{profile.nombre }</h3>
						<p className='text-gray-400'>Mi correo: {profile.email}</p>
					</div>
				</div>
			)}
			<button className='bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto'>
				Editar Perfil
			</button>
		</SettingSection>
	);
};

export default Profile;
