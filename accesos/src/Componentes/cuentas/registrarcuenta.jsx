import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Asegúrate de usar el hook useNavigate correctamente
import "bootstrap/dist/css/bootstrap.min.css"; 
import { BsFillPersonFill, BsFillEnvelopeFill, BsFillTelephoneFill } from 'react-icons/bs'; 
import "./styles.css";

function RegistrarCuenta() {
  // Inicializa el hook useNavigate
  const navigate = useNavigate();

  // Definir los estados para cada uno de los campos del formulario
  const [nombreCarpeta, setNombreCarpeta] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado", { nombreCarpeta, apellidoPaterno, apellidoMaterno, correo, telefono });
  };

  // Función para manejar el clic en el botón de Cancelar
  const handleCancel = () => {
    navigate('/loginregister'); // Redirige a la página de LoginRegister (ruta configurada en App.js)
  };

  return (
    <div className="container mt-5">
      <div className="card card-primary">
        <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
          <h3 className="card-title">Registrar Cuenta</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group input-group mb-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nombre"
                  value={nombreCarpeta}
                  onChange={(e) => setNombreCarpeta(e.target.value)}
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
                  value={apellidoPaterno}
                  onChange={(e) => setApellidoPaterno(e.target.value)}
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
                  value={apellidoMaterno}
                  onChange={(e) => setApellidoMaterno(e.target.value)}
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
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
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
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <span className="input-icon"><BsFillTelephoneFill /></span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg">Registrar</button>
            <br />
            <br />
            <button type="button" className="btn btn-success btn-block btn-lg" onClick={handleCancel}>Cancelar</button>
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

export default RegistrarCuenta;
