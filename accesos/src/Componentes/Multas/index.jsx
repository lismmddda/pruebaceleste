import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Index() {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]); // Estado para almacenar las notificaciones
  const [newNotificationsCount, setNewNotificationsCount] = useState(0); // Contador de notificaciones
  const [loading, setLoading] = useState(true); // Estado de carga

  // Función para cargar las notificaciones desde el backend
  useEffect(() => {
    // Llamada para obtener el número total de notificaciones
    fetch('http://localhost:5000/api/countNotificaciones')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNewNotificationsCount(data.totalNotificaciones); // Establece el contador de notificaciones
        }
      })
      .catch(err => {
        console.error('Error al obtener las notificaciones', err);
      });

    // Llamada para obtener todas las notificaciones (si es necesario mostrarlas)
    fetch('http://localhost:5000/api/notificaciones')
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNotificaciones(data.notificaciones);  // Asignamos las notificaciones a su estado
        }
        setLoading(false); // Una vez que la carga de datos ha terminado
      })
      .catch(err => {
        console.error('Error al obtener las notificaciones', err);
        setLoading(false); // En caso de error también finaliza la carga
      });
  }, []); // Solo se ejecuta al montar el componente

  // Función para redirigir al usuario a la vista de notificaciones
  const handleNotificacionesClick = () => {
    navigate('/Notificaciones');
  };

  const handleCancel = () => {
    navigate('/Home');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Listado de Multas</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Administrar Multas</h3>
            
            {/* Botón de notificaciones con contador */}
            <button 
              className={`btn ${newNotificationsCount > 0 ? 'btn-danger' : 'btn-secondary'} float-right mr-2`}
              onClick={handleNotificacionesClick}
            >
              Notificaciones ({newNotificationsCount}) {/* Muestra el total de notificaciones */}
            </button>

            <Link to="/Multas/registrar" className="btn btn-success float-right">
              Agregar Nueva Multa
            </Link>
            <button 
              type="button" 
              className="btn btn-secondary float-right mr-2" 
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>

          <div className="card-body">
            <p>En esta sección se gestionan las multas.</p>

            {/* Tabla de Multas */}
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Motivo de Multa</th>
                  <th>Monto de Multa</th>
                  <th>Fecha de Multa</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {/* Muestra las multas */}
                {notificaciones.map((notif) => (
                  <tr key={notif.id}>
                    <td>{notif.motivo}</td>
                    <td>{notif.monto}</td>
                    <td>{notif.fecha}</td>
                    <td>{notif.estado}</td>
                    <td>
                      <button className="btn btn-primary btn-sm">Modificar</button>
                      <button className="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Aquí irían las notificaciones si es necesario mostrarlas */}
            <div className="mt-3">
              <h5>Notificaciones:</h5>
              {notificaciones.length > 0 ? (
                <ul className="list-group">
                  {notificaciones.map((notif) => (
                    <li key={notif.id} className="list-group-item">
                      {notif.descripcion} <span className="badge badge-info">{notif.estado}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No hay notificaciones</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
