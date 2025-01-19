import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function ControlAccesosPagos() {
  const navigate = useNavigate(); // Crea una instancia de navigate

  // Función que maneja el evento de cancelar
  const handleCancel = () => {
    navigate('/Home'); // Redirige a la página de registrar pago
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Control de Accesos y Pagos</h1>
      </section>
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Listado de Pagos</h3>
            <button className="btn btn-success float-right">Realizar Nuevo Registro</button>
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Monto de Recibo</th>
                  <th>Fecha de Emisión</th>
                  <th>Método</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>$200.00</td>
                  <td>16/01/2025</td>
                  <td>Transferencia</td>
                  <td>Pagado</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Modificar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>$150.00</td>
                  <td>15/01/2025</td>
                  <td>Efectivo</td>
                  <td>No Pagado</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Modificar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                {/* Agregar más filas de pagos aquí */}
              </tbody>
            </table>
          </div>
          {/* Botón Cancelar fuera de la tabla, en la parte inferior de la tarjeta */}
          <div className="card-footer">
            <button className="btn btn-info" onClick={handleCancel}>Cancelar</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ControlAccesosPagos;
