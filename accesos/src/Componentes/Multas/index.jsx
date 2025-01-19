import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección

function Index() {
  const navigate = useNavigate(); // Usamos useNavigate para redirigir

  const handleCancel = () => {
    // Redirige a la página de inicio
    navigate('/Home');
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Listado de Multas</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Administrar Multas</h3>
            <Link to="/Multas/registrar" className="btn btn-success float-right">
              Agregar Nueva Multa
            </Link>
            <button 
              type="button" 
              className="btn btn-secondary float-right mr-2" 
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
          <div className="card-body">
            <p>En esta sección se gestionan las multas.</p>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Motivo de Multa</th>
                  <th>Monto de Multa</th>
                  <th>Fecha de Multa</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Estacionamiento indebido</td>
                  <td>$100.00</td>
                  <td>2025-01-01</td>
                  <td>Pendiente</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Modificar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>Exceso de velocidad</td>
                  <td>$200.00</td>
                  <td>2025-01-02</td>
                  <td>Pagado</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Modificar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Index;
