import { useState, useEffect } from 'react';

export default function Transformations() {
  const [transformaciones, setTransformaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Consultamos a Goku (ID: 1) para extraer su lista de transformaciones
    const obtenerTransformaciones = async () => {
      try {
        const respuesta = await fetch('https://dragonball-api.com/api/characters/1');
        const datos = await respuesta.json();
        
        // Guardamos solo el arreglo de transformaciones en el estado
        setTransformaciones(datos.transformations || []);
        setCargando(false);
      } catch (error) {
        console.error('Error al cargar las transformaciones:', error);
        setCargando(false);
      }
    };

    obtenerTransformaciones();
  }, []);

  if (cargando) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Elevando el Ki... Cargando...</h2>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#ff7700', fontSize: '2.5rem', marginBottom: '30px' }}>
        Fases de Transformación de Goku
      </h2>
      
      <div className="grid-container">
        {transformaciones.map((fase) => (
          <div className="card" key={fase.id} style={{ border: '1px solid #ff7700' }}>
            <img 
              src={fase.image} 
              alt={fase.name} 
              style={{ height: '280px', width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 0 10px rgba(255, 119, 0, 0.5))' }} 
            />
            <h3 style={{ fontSize: '1.4rem', margin: '15px 0 10px 0' }}>{fase.name}</h3>
            <p style={{ color: '#aaa', margin: '0' }}>
              <strong>Poder de Ki:</strong> {fase.ki}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}