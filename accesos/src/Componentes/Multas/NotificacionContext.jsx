import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);

  // Función para actualizar el contador de notificaciones
  const updateNotificationsCount = (count) => {
    setNewNotificationsCount(count);
  };

  useEffect(() => {
    // Polling para actualizar las notificaciones cada cierto tiempo
    const intervalId = setInterval(() => {
      const token = localStorage.getItem('token'); // Obtengo el token almacenado en localStorage

      if (!token) {
        console.error('No token found!');
        return;
      }

      fetch('http://localhost:5000/api/countNotificaciones', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setNewNotificationsCount(data.totalNotificaciones);
          }
        })
        .catch((err) => {
          console.error('Error al obtener las notificaciones', err);
        });
    }, 5000); // Cada 5 segundos

    return () => clearInterval(intervalId); // Limpiar intervalo al desmontar
  }, []);

  return (
    <NotificationContext.Provider value={{ newNotificationsCount, updateNotificationsCount }}>
      {children}
    </NotificationContext.Provider>
  );
};
