import React, { useState, useEffect } from "react";
import "./Notificaciones.css"; // Importamos los estilos
import { FaEllipsisV } from "react-icons/fa"; // Importamos el icono

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  // Función para obtener las notificaciones desde la API
  const fetchNotifications = () => {
    fetch("http://localhost:5000/api/notificaciones")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotificaciones(data.notificaciones);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener las notificaciones", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    // Consulta inicial
    fetchNotifications();

    // Configuramos el intervalo para que se actualice cada 5 segundos (5000 milisegundos)
    const intervalId = setInterval(fetchNotifications, 1000);

    // Limpiamos el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const openModal = (notificacion) => {
    setSelectedNotification(notificacion);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedNotification(null);
  };

  if (loading) {
    return <div className="loading">Cargando notificaciones...</div>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>
          Notificaciones{" "}
          <span className="notification-counter">{notificaciones.length}</span>
        </h1>
      </section>

      <section className="content">
        {notificaciones.length === 0 ? (
          <p>No hay notificaciones</p>
        ) : (
          notificaciones.map((notificacion, index) => (
            <div key={index} className="card">
              <div className="card-body">
                <h6 className="notification-title">{notificacion.titulo}</h6>

                {/* Contenedor con la información de la notificación */}
                <div className="notification-info">
                  <div className="notification-section">
                    <h2 className="section-title">
                      Descripción y motivo de multa
                    </h2>
                    <span className="notification-reason">
                      {notificacion.descripcion}
                    </span>
                  </div>

                  <div className="notification-section">
                    <h2 className="section-title">Fecha</h2>
                    <span className="notification-date">
                      {notificacion.fecha}
                    </span>
                  </div>

                  <FaEllipsisV
                    className="icon-options"
                    onClick={() => openModal(notificacion)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Modal */}
      {modalVisible && selectedNotification && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedNotification.titulo}</h3>
            <p>{selectedNotification.descripcion}</p>
            <button className="close-btn" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Notificaciones;