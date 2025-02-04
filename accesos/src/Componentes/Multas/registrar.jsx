import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function RegistrarMulta() {
  const [descripcion, setDescripcion] = useState('');
  const [fecha, setFecha] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [monto, setMonto] = useState('');
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga
  const [error, setError] = useState(null);  // Para manejar posibles errores

  const navigate = useNavigate();  // Usamos el hook para navegar

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que todos los campos están completos antes de enviar la solicitud
    if (!descripcion || !fecha || !departamento || !monto) {
      setError('Todos los campos son requeridos.');
      return;
    }

    setLoading(true);
    setError(null);  // Limpiar error previo si existe

    // Aquí se realiza la solicitud HTTP para registrar la multa
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
        alert('Multa registrada exitosamente');
        navigate('/Multas'); // Redirigir a la lista de multas o a donde necesites
      } else {
        setError(data.message || 'Hubo un error al registrar la multa');
      }
    } catch (error) {
      console.error('Error al registrar la multa:', error);
      setError('Hubo un error en la conexión. Intenta nuevamente.');
    } finally {
      setLoading(false);  // Terminar el estado de carga
    }
  };

  const handleCancel = () => {
    navigate('/Multas');  // Navegar de vuelta a la página de lista de multas
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

            {error && <div className="alert alert-danger mt-3">{error}</div>} {/* Mostrar errores */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrarMulta;
