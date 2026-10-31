import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  // 1. useState inicializado con localStorage
  const [personajesDB, setPersonajesDB] = useState(() => {
    const guardados = localStorage.getItem('personajes_db');
    return guardados ? JSON.parse(guardados) : [];
  });

  const [razaActiva, setRazaActiva] = useState(() => {
    return localStorage.getItem('filtro_raza') || 'Todos';
  });

  // Guardar filtro en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('filtro_raza', razaActiva);
  }, [razaActiva]);

  // 2. Función Asíncrona (Async/Await) para la API de Dragon Ball
  const obtenerPersonajes = async () => {
    try {
      const respuesta = await fetch('https://dragonball-api.com/api/characters?limit=50');
      const datos = await respuesta.json();
      // La API de Dragon Ball devuelve un array directo o dentro de items
      const lista = datos.items || datos;
      setPersonajesDB(lista);
      localStorage.setItem('personajes_db', JSON.stringify(lista));
    } catch (error) {
      console.error('Error al conectar con la Dragon Ball API:', error);
    }
  };

  useEffect(() => {
    if (personajesDB.length === 0) {
      obtenerPersonajes();
    }
  }, []);

  // Filtrado de personajes por Raza
  const razasUnicas = ['Todos', 'Saiyan', 'Human', 'Namekian', 'Frieza Race'];

  const personajesFiltrados = personajesDB.filter((p) => {
    if (razaActiva === 'Todos') return true;
    return p.race === razaActiva;
  });

  return (
    <>
      <div className="filter-container">
        <h3>Filtrar por Raza:</h3>
        <div className="filter-buttons">
          {razasUnicas.map((raza) => (
            <button
              key={raza}
              className={razaActiva === raza ? 'active-btn' : ''}
              onClick={() => setRazaActiva(raza)}
            >
              {raza}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-container">
        {personajesFiltrados.map((personaje) => (
          <div className="card" key={personaje.id}>
            <img src={personaje.image} alt={personaje.name} />
            <h3>{personaje.name}</h3>
            <p><strong>Raza:</strong> {personaje.race}</p>
            <p><strong>Género:</strong> {personaje.gender}</p>
            {/* Ruta dinámica */}
            <Link to={`/character/${personaje.id}`} className="btn-detalle">
              Ver Detalle
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}