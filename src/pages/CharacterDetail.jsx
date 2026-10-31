import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function CharacterDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);

  useEffect(() => {
    const cargarDetalle = async () => {
      try {
        const res = await fetch(`https://dragonball-api.com/api/characters/${id}`);
        const data = await res.json();
        setPersonaje(data);
      } catch (error) {
        console.error("Error cargando detalle:", error);
      }
    };
    cargarDetalle();
  }, [id]);

  if (!personaje) return <p style={{ textAlign: 'center' }}>Cargando información...</p>;

  return (
    <>
      <div className="detail-container">
        <button onClick={() => navigate(-1)} className="btn-regresar">⬅ Regresar</button>
        <div className="detail-card">
          <img src={personaje.image} alt={personaje.name} />
          <div>
            <h2>{personaje.name}</h2>
            <p><strong>Ki Base:</strong> {personaje.ki}</p>
            <p><strong>Ki Máximo:</strong> {personaje.maxKi}</p>
            <p><strong>Afiliación:</strong> {personaje.affiliation}</p>
            <p>{personaje.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}