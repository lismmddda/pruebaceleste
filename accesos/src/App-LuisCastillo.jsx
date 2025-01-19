// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importa el Router y las rutas
import LoginRegister from './Componentes/LoginRegister/LoginRegister'; // Importa el LoginRegister
import RegistrarCuenta from './Componentes/cuentas/registrarcuenta'; // Importa el componente RegistrarCuenta
import Home from './Componentes/Home'; // Importa el componente Home (asegurándote de que lo tienes creado)
import index from './Componentes/usuarios/index'


function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta para la página de Login/Register */}
        <Route path="/" element={<LoginRegister />} />

        {/* Ruta para la página de Registro de Cuenta */}
        <Route path="/registrarcuenta" element={<RegistrarCuenta />} />

        {/* Ruta para la página de Home (ahora apunta al componente Home) */}
        <Route path="/home" element={<Home />} /> {/* Aquí cambiamos RegistrarCuenta por Home */}
        <Route path="/index" element={<index />} /> {/* Aquí cambiamos RegistrarCuenta por Home */}

      </Routes>
    </Router>
  );
}

export default App;
