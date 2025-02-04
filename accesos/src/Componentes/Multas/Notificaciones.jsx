import React, { useState, useEffect } from 'react';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]); // Estado para las notificaciones
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    // Petición al backend para obtener todas las notificaciones
    fetch('http://localhost:5000/api/notificaciones')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNotificaciones(data.notificaciones); // Guardamos las notificaciones
        }
        setLoading(false); // Fin de la carga
      })
      .catch(err => {
        console.error('Error al obtener las notificaciones', err);
        setLoading(false); // Fin de la carga en caso de error
      });
  }, []);

  if (loading) {
    return <div>Cargando notificaciones...</div>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Notificaciones</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-body">
            <h5>Listado de Notificaciones</h5>
            {notificaciones.length > 0 ? (
              <ul className="list-group">
                {notificaciones.map((notif) => (
                  <li key={notif.id} className="list-group-item">
                    {notif.descripcion}
                    <span className={`badge ${notif.estado === 'Leído' ? 'badge-success' : 'badge-warning'}`}>
                      {notif.estado}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay notificaciones</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notificaciones;
