import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function Login() {
  const [nombre, setNombre] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    login(nombre);
    navigate('/', { replace: true });
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Escribe tu nombre de Guerrero Z..."
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}