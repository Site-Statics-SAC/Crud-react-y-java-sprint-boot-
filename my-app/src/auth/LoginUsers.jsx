import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserService from '../services/UserService'; // Importa UserService
import svgImage from '../assets/user-svgrepo-com.svg'; // Importa la imagen de usuario


const LoginUsers = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const userData = await UserService.login(email, password);
  
      if (userData.token) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);
  
        // Verifica el rol y redirige según el rol
        if (UserService.isAdmin()) {
          navigate('/overview');  // Redirige a la página de administrador
        } else {
          navigate('/overview');  // Redirige a la página de usuario
        }
      } else {
        setError(userData.message);
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión', error);
      setError('Ocurrió un error durante el inicio de sesión');
      setTimeout(() => {
        setError('');
      }, 5000);
    }
  };
  
  return (
    <div className="bg-gradient-to-r from-[#Ff6961] to-[#572364] grid grid-cols-12 w-screen h-screen">
      <div className="mini:minimo-login minix:minimo-login minimo:minimo-login sm:sm-login lg:lg-login">
        <h3 className='m-2 text-gradient subpixel-antialiased mini:text-[20px] minix:text-[30px] sm:text-[40px] text-center'>BIENVENIDO</h3>

        <form onSubmit={handleLogin} className="m-10">
          <div className="flex flex-col justify-center items-center gap-5 static">
            <label htmlFor="email">
              <img src={svgImage} alt="Usuario" />
            </label>
            <label htmlFor="email">Email</label>
            <input 
              className="mini:mini-input minix:minix-input minimo:minimo-input" 
              type="email"
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required autoComplete="username"
            />

            <label htmlFor="password">
              <img src={svgImage} alt="Contraseña" />
            </label>
            <label htmlFor="password">Contraseña</label>
            <input 
              className="mini:mini-input minix:minix-input minimo:minimo-input" 
              type="password" 
              id="password" 
              value={password}
              required autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <div className="text-red-500">{error}</div>}
            <button type="submit" className='text-center flex justify-center items-center absolute bottom-20 left-1/2 transform -translate-x-1/2 w-[100px] h-[50px] bg-blue-500 text-[#fff]'>Ingresar</button>
          </div>
        </form>
      </div>
    </div>
  );  
}
export default LoginUsers