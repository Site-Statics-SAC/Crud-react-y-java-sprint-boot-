import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginUsers from './auth/LoginUsers';
import UserService from './services/UserService';
import UsersPage from './pages/UsersPage';
import SettingsPage from './pages/SettingsPage';
import OverviewPage from './pages/OverviewPage';
import InstitucionPage from './pages/InstitucionPage';
import EstudentPage from './pages/StudentPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verifica si el usuario está autenticado y es administrador
    const authenticated = UserService.isAuthenticated();
    setIsAuthenticated(authenticated);
    setIsAdmin(UserService.isAdmin());
  }, []);

  return (
 
      <BrowserRouter>
          
        <Routes>
          <Route path="/" element={<LoginUsers />} />
          <Route path="/login" element={<LoginUsers />} />
          <Route path='/users' element={<UsersPage />} />
          <Route path='/overview' element={<OverviewPage />} />
          <Route path='/settings' element={<SettingsPage />} />
          <Route path='/institucion' element={<InstitucionPage />} />
          <Route path='/estudiante' element={<EstudentPage />} />
          
          {/* Ruta de inicio, solo si el usuario está autenticado */}
          {isAuthenticated && <Route path="/overview" element={<OverviewPage />} />}

          {/* Ruta solo para administradores */}
          {isAdmin && <Route path="/overview" element={<OverviewPage />} />}

        
        </Routes>
      </BrowserRouter>
  );
}

export default App;
