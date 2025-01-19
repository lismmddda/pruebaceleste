import React from 'react';
import { useNavigate } from 'react-router-dom'; // Usamos useNavigate para redirigir
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs';

function RegistrarUsuario() {
  const navigate = useNavigate(); // Inicializa el hook useNavigate

  // Función para manejar el clic en el botón de Cancelar
  const handleCancel = () => {
    navigate('/usuarios/index'); // Redirige a la página index.jsx dentro de la carpeta usuarios
  };

  return (
    <div className="container mt-5">
      <div className="card card-primary">
        <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
          <h3 className="card-title">Registrar Usuario</h3>
        </div>
        <div className="card-body">
          <form>
            {/* Formulario para registrar usuario */}
            <div className="form-group input-group mb-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nombre"
                />
                <span className="input-icon"><BsFillPersonFill /></span>
              </div>
            </div>
            <div className="form-group input-group mb-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Apellido paterno"
                />
                <span className="input-icon"><BsFillPersonFill /></span>
              </div>
            </div>
            <div className="form-group input-group mb-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Apellido materno"
                />
                <span className="input-icon"><BsFillPersonFill /></span>
              </div>
            </div>
            <div className="form-group input-group mb-4">
              <div className="input-wrapper">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Correo electrónico"
                />
                <span className="input-icon"><BsFillEnvelopeFill /></span>
              </div>
            </div>
            <div className="form-group input-group mb-4">
              <div className="input-wrapper">
                <input
                  type="tel"
                  className="form-control form-control-lg"
                  placeholder="Ingresa tu teléfono"
                />
                <span className="input-icon"><BsFillTelephoneFill /></span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">Registrar</button>
            <br />
            <br />
            {/* Botón para redirigir a la página de usuarios */}
            <button
              type="button"
              className="btn btn-success btn-block btn-lg"
              onClick={handleCancel}  // Llama a handleCancel para redirigir
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>

      <style>
        {`
          .form-control-lg {
            font-size: 1.25rem;
            padding-left: 2rem;
            padding-right: 3rem;
            height: 60px;
            width: 100%;
          }

          .input-wrapper {
            position: relative;
            width: 100%;
          }

          .input-icon {
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translateY(-50%);
            font-size: 1.5rem;
            color: #007bff;
            pointer-events: none;
          }

          .card-body {
            padding: 2rem;
          }

          .btn-lg {
            font-size: 1.2rem;
            padding: 1rem;
          }

          @media (max-width: 768px) {
            .form-control-lg {
              font-size: 1rem;
              padding-left: 1.5rem;
              padding-right: 2.5rem;
            }

            .input-icon {
              font-size: 1.25rem;
            }
          }
        `}
      </style>
    </div>
  );
}

export default RegistrarUsuario;
