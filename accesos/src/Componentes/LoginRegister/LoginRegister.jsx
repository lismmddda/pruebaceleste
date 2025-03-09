import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './LoginRegister.css';

const LoginRegister = () => {
  const [telefono, setTelefono] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(telefono)) {
      setError('Por favor, ingresa un número de teléfono válido.');
      return;
    }
  
    if (!password.trim()) {
      setError('Por favor, ingresa una contraseña.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ telefono, password })
      });
  
      const data = await response.json();
  
      if (data.success) {
        setSuccessMessage('Login exitoso');
        
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('rol', data.rol);
        localStorage.setItem('token', data.token);  // Guardamos el token JWT
  
        if (data.rol === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/home');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('Error en la conexión con el servidor');
    }
  };

  return (
    <div className="login-page">
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Condominio</p>
              <form onSubmit={handleLogin}>
                <div className="input-group mb-3">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Ingresa el número de teléfono"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <i className="bi bi-phone"></i>
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Ingresa tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <i className="bi bi-lock"></i>
                    </div>
                  </div>
                </div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <button type="submit" className="btn btn-success form-control">
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                </button>
              </form>
              <br />
              <a
                href="#"
                className="btn btn-primary form-control"
                onClick={() => navigate('/registrarcuenta')}
              >
                <i className="bi bi-pencil-square"></i> Registrar cuenta
              </a>
              <br />
              <a
                href="#"
                className="btn btn-link form-control"
                onClick={() => navigate('/recuperar-contrasena')}
              >
                <i className="bi bi-arrow-repeat"></i> Olvidé mi contraseña
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
