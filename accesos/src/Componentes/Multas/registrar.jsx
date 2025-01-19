import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate

function RegistrarMulta() {
  const [motivo, setMotivo] = useState('');
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate();  // Usamos el hook para navegar

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica de registro de la multa
    console.log('Multa registrada:', { motivo, monto, fecha, estado });
  };

  const handleCancel = () => {
    // Navegar de vuelta a la página de lista de multas
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
                <label htmlFor="motivo">Motivo de la Multa</label>
                <input
                  type="text"
                  className="form-control"
                  id="motivo"
                  placeholder="Ingrese el motivo"
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="monto">Monto de la Multa</label>
                <input
                  type="number"
                  className="form-control"
                  id="monto"
                  placeholder="Ingrese el monto"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
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
                <label htmlFor="estado">Estado de la Multa</label>
                <select
                  className="form-control"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                >
                  <option value="">Seleccione el estado</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Pagado">Pagado</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary">Registrar Multa</button>
              <br /><br />
              <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancelar Multa</button> {/* Botón de cancelar */}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrarMulta;
