import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate para la navegación

function Registrarpago() {
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [metodo, setMetodo] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate(); // Instanciamos el hook de navegación

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la lógica para guardar el pago
    console.log('Pago Registrado', { monto, fecha, metodo, estado });
  };

  const handleCancel = () => {
    // Redirigir a la ruta del archivo index.jsx (que es la ruta raíz "/")
    navigate('/Pagos');
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Registrar Pago</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Formulario de Registro de Pago</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="monto">Monto de Recibo</label>
                <input
                  type="number"
                  className="form-control"
                  id="monto"
                  placeholder="Ingrese monto"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="fecha">Fecha de Emisión</label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="metodo">Método de Pago</label>
                <select
                  className="form-control"
                  id="metodo"
                  value={metodo}
                  onChange={(e) => setMetodo(e.target.value)}
                  required
                >
                  <option value="">Seleccione un método</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Tarjeta">Tarjeta</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado</label>
                <select
                  className="form-control"
                  id="estado"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  required
                >
                  <option value="">Seleccione el estado</option>
                  <option value="Pagado">Pagado</option>
                  <option value="No Pagado">No Pagado</option>
                </select>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-success">Registrar Pago</button>
                <br />
                <br />
                <button type="button" className="btn btn-danger" onClick={handleCancel}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Registrarpago;
