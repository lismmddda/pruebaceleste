import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  // Inicializar el hook de navegación

  useEffect(() => {
    // Hacer la solicitud GET al servidor para obtener los usuarios
    axios.get('http://localhost:5000/api/usuarios')
      .then(response => {
        if (response.data.success) {
          setUsuarios(response.data.usuarios);
        } else {
          console.error('Error al obtener los usuarios');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Esto solo se ejecuta una vez cuando el componente se monta

  const handleAddUser = () => {
    // Redirigir a la página de registrar usuario
    navigate('/usuarios/registrar');
  };

  // Función para manejar el clic en el botón de Cancelar
  const handleCancel = () => {
    navigate('/Home'); // Redirige a la página Home.jsx
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <center><h1>Listado de Usuarios</h1></center>
        <button onClick={handleAddUser} className="btn btn-success">Agregar Usuario</button>
      </section>
      <section className="content">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Correo electrónico</th>
              <th>Teléfono</th>
              <th>Confirmación Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nombre}</td>
                <td>{usuario.app}</td>
                <td>{usuario.apm}</td>
                <td>{usuario.email}</td>
                <td>{usuario.telefono}</td>
                <td>{usuario.confirma_telefono ? 'Sí' : 'No'}</td>
                <td>{usuario.rol}</td>
                <td>
                  <button className="btn btn-primary">Editar</button>
                  <button className="btn btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {/* Botón de Cancelar para redirigir a Home.jsx */}
      <div className="content-footer">
        <button onClick={handleCancel} className="btn btn-secondary">Cancelar</button>
      </div>
    </div>
  );
}

export default Usuarios;
