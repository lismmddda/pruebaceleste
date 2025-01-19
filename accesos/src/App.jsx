import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Componentes/LoginRegister/LoginRegister';
import RegistrarCuenta from './Componentes/cuentas/registrarcuenta';
import Home from './Componentes/Home';
import Usuarios from './Componentes/usuarios';  
import RegistrarUsuario from './Componentes/usuarios/registrar_usuario';
import RegistrarRol from './Componentes/roles/index';  
import RegistrarPago from './Componentes/Pagos';  
import Registrarpago from './Componentes/Pagos/registrarpago';  
import IndexPorton from './Componentes/Portones';  // Listado de portones
import RegistrarPorton from './Componentes/Portones/registrar_porton';  // Registro de portón
import IndexMultas from './Componentes/Multas';  // Importamos el componente de multas
import RegistrarMulta from './Componentes/Multas/registrar'; // Ruta para registrar multa

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/registrarcuenta" element={<RegistrarCuenta />} />
        <Route path="/home" element={<Home />} /> {/* Verifica que esta ruta esté bien configurada */}
        <Route path="/usuarios" element={<Usuarios />} />
        <Route path="/usuarios/registrar" element={<RegistrarUsuario />} />
        <Route path="/roles" element={<RegistrarRol />} />
        <Route path="/Pagos" element={<RegistrarPago />} />
        <Route path="/Pagos/registrarpago" element={<Registrarpago />} />
        <Route path="/Portones" element={<IndexPorton />} />
        <Route path="/Portones/registrar" element={<RegistrarPorton />} />
        <Route path="/Multas" element={<IndexMultas />} />
        <Route path="/Multas/registrar" element={<RegistrarMulta />} />
      </Routes>
    </Router>
  );
}

export default App;
