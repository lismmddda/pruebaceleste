// src/Componentes/Portones/index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function IndexPorton() {
  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Listado de Portones</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Administrar Portones</h3>
          </div>
          <div className="card-body">
            {/* Tabla de solicitudes */}
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Motivo de Solicitud</th>
                  <th>Fecha y Hora</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Instalación de portón eléctrico</td>
                  <td>2025-01-16 10:30</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Ver</button>
                    <button className="btn btn-warning btn-sm">Modificar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
                <tr>
                  <td>Reparación de portón</td>
                  <td>2025-01-15 14:00</td>
                  <td>
                    <button className="btn btn-primary btn-sm">Ver</button>
                    <button className="btn btn-warning btn-sm">Modificar</button>
                    <button className="btn btn-danger btn-sm">Eliminar</button>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Botones adicionales */}
            <div className="d-flex justify-content-between">
              <Link to="/Portones/registrar" className="btn btn-success">Realizar otro registro de solicitud</Link>
              <Link to="/home" className="btn btn-secondary">Cancelar</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IndexPorton;
