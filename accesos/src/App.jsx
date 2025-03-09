import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Componentes/LoginRegister/LoginRegister';
import RegistrarCuenta from './Componentes/cuentas/registrarcuenta';
import Home from './Componentes/Home';
import Usuarios from './Componentes/usuarios';  
import RegistrarUsuario from './Componentes/usuarios/registrar_usuario';
import Modificar from './Componentes/usuarios/Modificar';  // Asegúrate de importar Modificar
import RegistrarRol from './Componentes/roles/index';  
import RegistrarPago from './Componentes/Pagos';  
import Registrarpago from './Componentes/Pagos/registrarpago';  
import IndexPorton from './Componentes/Portones';  
import RegistrarPorton from './Componentes/Portones/registrar_porton';  
import IndexMultas from './Componentes/Multas';  
import RegistrarMulta from './Componentes/Multas/registrar';  
import Notificaciones from './Componentes/Multas/Notificaciones';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/registrarcuenta" element={<RegistrarCuenta />} />
        <Route path="/home" element={<Home />} />
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/registrar" element={<RegistrarUsuario />} />
        <Route path="/usuarios/modificar/:id" element={<Modificar />} />
        <Route path="/roles" element={<RegistrarRol />} />
        <Route path="/Pagos" element={<RegistrarPago />} />
        <Route path="/Pagos/registrarpago" element={<Registrarpago />} />
        <Route path="/Portones" element={<IndexPorton />} />
        <Route path="/Portones/registrar" element={<RegistrarPorton />} />
        <Route path="/Multas" element={<IndexMultas />} />
        <Route path="/Multas/registrar" element={<RegistrarMulta />} />
        <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </Router>
  );
}

export default App;
