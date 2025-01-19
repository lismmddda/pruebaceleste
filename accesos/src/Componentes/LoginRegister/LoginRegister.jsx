import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import './LoginRegister.css';

const LoginRegister = () => {
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Convertir teléfono ingresado a minúsculas
    const telefonoIngresado = telefono.toLowerCase();

    // Validación de teléfono
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(telefonoIngresado)) {
      setError('Por favor, ingresa un número de teléfono válido.');
      setSuccessMessage('');
      return;
    } else {
      setError('');
    }
  
    try {
      // Enviar solicitud al backend para verificar el usuario
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telefono: telefonoIngresado }),
      });
      
      const data = await response.json();
  
      if (data.success) {
        setSuccessMessage('Usuario correcto');
        // Almacenar el ID, nombre y rol del usuario en localStorage
        localStorage.setItem('user_id', data.user_id);
        localStorage.setItem('nombre', data.nombre);
        localStorage.setItem('rol', data.rol); // Almacenar el rol
  
        // Redirigir a Home o a la página correspondiente según el rol
        if (data.rol === 'admin') {
          navigate('/admin-dashboard');  // Navegar a un dashboard de admin si el rol es admin
        } else {
          navigate('/home');
        }
      } else {
        setError(data.message); // Mostrar el mensaje de error del backend
        setSuccessMessage('');
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError('Error al intentar iniciar sesión.');
      setSuccessMessage('');
    }
  };
  

  return (
    <div className="login-page">
      <div className="hold-transition login-page">
        <div className="login-box">
          <div className="card">
            <div className="card-body login-card-body">
              <p className="login-box-msg">Condominio</p>

              {/* Formulario de login */}
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

                {/* Mostrar error si hay uno */}
                {error && <div className="alert alert-danger">{error}</div>}

                {/* Mostrar mensaje de éxito si el login es correcto */}
                {successMessage && <div className="alert alert-success bg-success">{successMessage}</div>}

                <button type="submit" className="btn btn-success form-control">
                  <i className="bi bi-box-arrow-in-right"></i> Iniciar sesión
                </button>
              </form>

              <br />
              <br />

              <a
                href="#"
                className="btn btn-primary form-control"
                onClick={() => navigate('/registrarcuenta')}
              >
                <i className="bi bi-pencil-square"></i> Registrar cuenta
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
