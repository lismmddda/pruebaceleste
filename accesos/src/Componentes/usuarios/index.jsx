import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // Estado para alternar la visibilidad de la contraseña
  const navigate = useNavigate();

  // Fetch usuarios desde el backend
  const fetchUsuarios = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/usuarios', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('No autorizado');
      }

      const data = await response.json();
      setUsuarios(data.usuarios);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      setError('Hubo un error al obtener los usuarios. Intenta nuevamente.');
    }
  };

  useEffect(() => {
    fetchUsuarios();
    setLoading(false);
  }, []);

  // Función para agregar un usuario
  const handleAddUser = () => {
    navigate('/usuarios/registrar');
  };

  // Función para editar un usuario
  const handleEditUser = (id) => {
    navigate(`/usuarios/modificar/${id}`);  // Redirigir a la URL de modificar con el ID del usuario
  };

  // Función para eliminar un usuario
  const handleDeleteUser = (id) => {
    console.log('Eliminando usuario con ID:', id);
    // Aquí puedes agregar la lógica para eliminar el usuario.
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Función para manejar el clic en "Cancelar"
  const handleCancel = () => {
    navigate('/home'); // Redirige al Home o la página que desees
  };

  if (loading) {
    return <p>Cargando usuarios...</p>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <center><h1>Listado de Usuarios</h1></center>
        <button onClick={handleAddUser} className="btn btn-success mb-3">Agregar Usuario</button>
        {/* Botón de Cancelar */}
        <button onClick={handleCancel} className="btn btn-secondary mb-3 ml-3">Cancelar</button>
      </section>
      <section className="content">
        {error && <div className="alert alert-danger">{error}</div>}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>   
              <th className="text-center">Nombre</th>
              <th className="text-center">Apellido Paterno</th>
              <th className="text-center">Apellido Materno</th>
              <th className="text-center">Correo electrónico</th>
              <th className="text-center">Teléfono</th>
              <th className="text-center">Rol</th>
              <th className="text-center">Contraseña</th>
              <th className="text-center">Acciones</th>
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
                <td>{usuario.rol}</td>
                <td>{usuario.password}</td>
                <td className="text-center">
                  <button onClick={() => handleEditUser(usuario.id)} className="btn btn-primary btn-sm">
                    Editar
                  </button>
                  <button onClick={() => handleDeleteUser(usuario.id)} className="btn btn-danger btn-sm ml-2">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Usuarios;
