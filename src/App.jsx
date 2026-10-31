import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CharacterDetail from './pages/CharacterDetail';
import Transformations from './pages/Transformations';
import About from './pages/About';
import Login from './pages/Login';
import RutaPrivada from './auth/RutaPrivada'; // <-- Importa el componente guardián
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />

      <h1 className="banner_principal" style={{ textAlign: 'center', margin: '20px 0', color: '#ff7700' }}>
        Pokedex Dragon Ball Z
      </h1>

      <Routes>
        {/* === RUTAS PÚBLICAS === */}
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />

        {/* === RUTA PRIVADA === */}
        <Route 
          path="/transformations" 
          element={
            <RutaPrivada>
              <Transformations />
            </RutaPrivada>
          } 
        />

        <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Página no encontrada</h2>} />
      </Routes>
    </div>
  );
}

export default App;