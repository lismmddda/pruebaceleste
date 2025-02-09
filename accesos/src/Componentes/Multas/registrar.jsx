import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrarMulta.css'; // Importamos el CSS

function RegistrarMulta() {
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal
  const [modalMessage, setModalMessage] = useState(''); // Mensaje del modal

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!descripcion || !fecha || !departamento || !monto) {
      setError('Todos los campos son requeridos.');
      return;
    }
  
    setLoading(true);
    setError(null);
    setShowModal(true); // Mostrar el modal al iniciar el proceso
    setModalMessage('Procesando multa...'); // Mostrar "Procesando multa..." al inicio
  
    try {
      const response = await fetch('http://localhost:5000/api/registrarMulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          descripcion,
          fecha,
          departamento,
          monto,
        }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Primero cambiamos el mensaje a "Procesando"
        setModalMessage('Procesando...');
  
        // Luego mostramos "Multa registrada exitosamente" después de un breve intervalo
        setTimeout(() => {
          setModalMessage('Multa registrada exitosamente'); // Cambiar a "Multa registrada exitosamente"
          setTimeout(() => {
            setShowModal(false); // Ocultar el modal después de 3 segundos
            navigate('/Multas'); // Redirigir a la página de multas
          }, 3000); // Redirigir después de 3 segundos
        }, 1000); // Mostrar "Multa registrada exitosamente" después de 1 segundo
      } else {
        // Si la API no fue exitosa, cambiar el mensaje del modal
        setError(data.message || 'Hubo un error al registrar la multa');
        setModalMessage('Error al registrar la multa');
        setTimeout(() => setShowModal(false), 3000); // Cerrar el modal después de 3 segundos
      }
    } catch (error) {
      console.error('Error al registrar la multa:', error);
      setError('Hubo un error en la conexión. Intenta nuevamente.');
      setModalMessage('Error al registrar la multa');
      setTimeout(() => setShowModal(false), 3000); // Cerrar el modal después de 3 segundos
    } finally {
      setLoading(false);
    }
  };
  
  
  // JSX del modal
  {showModal && (
    <div className="modal-overlay">
      <div className="modal-content">
        {modalMessage === 'Procesando multa...' && <div className="spinner"></div>} {/* Mostrar spinner solo durante el procesamiento */}
        <p className={`modal-message ${modalMessage.includes("exitosamente") ? 'modal-message-success' : modalMessage.includes("Error") ? 'modal-message-error' : 'modal-message-processing'}`}>
          {modalMessage}
        </p>
      </div>
    </div>
  )}
  
  
  const handleCancel = () => {
    navigate('/Multas');
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Registrar Multa</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="descripcion">Descripción de la Multa</label>
                <input
                  type="text"
                  className="form-control"
                  id="descripcion"
                  placeholder="Ingrese la descripción de la multa"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha de la Multa</label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="departamento">Departamento</label>
                <input
                  type="text"
                  className="form-control"
                  id="departamento"
                  placeholder="Ingrese el departamento"
                  value={departamento}
                  onChange={(e) => setDepartamento(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="monto">Monto de la Multa</label>
                <input
                  type="number"
                  className="form-control"
                  id="monto"
                  placeholder="Ingrese el monto de la multa"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrar Multa'}
              </button>
              <br /><br />
              <button type="button" className="btn btn-danger" onClick={handleCancel}>
                Cancelar Multa
              </button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}

            {/* Modal de carga */}
            {showModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <div className="spinner"></div>
                  <p>{modalMessage}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrarMulta;
