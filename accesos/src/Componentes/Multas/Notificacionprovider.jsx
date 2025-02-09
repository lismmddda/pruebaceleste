import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { NotificationProvider } from './NotificationContext'; // Importar el contexto
import Index from './index';
import Notificaciones from './Notificaciones'; // Suponiendo que tienes este componente

function App() {
  return (
    <NotificationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/Notificaciones" element={<Notificaciones />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
