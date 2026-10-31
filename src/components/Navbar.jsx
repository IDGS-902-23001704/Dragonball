import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const { autenticado, usuario, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
          Personajes
        </NavLink>
        <NavLink to="/transformations" className={({ isActive }) => (isActive ? 'active' : '')}>
          Transformaciones
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
          Acerca de
        </NavLink>
      </div>

      <div className="nav-auth">
        {autenticado ? (
          <>
            <span>Hola, <strong>{usuario}</strong></span>
            <button onClick={logout} className="btn-logout">Salir</button>
          </>
        ) : (
          <Link to="/login" className="btn-login">Iniciar Sesión</Link>
        )}
      </div>
    </nav>
  );
}