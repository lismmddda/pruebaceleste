// src/Componentes/roles/RegistrarRol.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

function RegistrarRol() {
  const navigate = useNavigate();  // Inicializar useNavigate

  const handleCancel = () => {
    // Redirigir a Home
    navigate('/home');
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Listado de Roles</h3>
            <button className="btn btn-success float-right">Agregar Rol</button>
            <button className="btn btn-secondary float-right mr-2" onClick={handleCancel}>Cancelar</button> {/* Botón de cancelar */}
          </div>
          <div className="card-body">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Correo Electrónico</th>
                  <th>Rol</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Juan Pérez</td>
                  <td>juan.perez@example.com</td>
                  <td>Administrador</td>
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

export default RegistrarRol;
