import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Modificar.css';  // Asegúrate de importar el archivo CSS

function Modificar() {
  const { id } = useParams(); // Obtener el ID del usuario desde la URL
  const navigate = useNavigate(); // Hook para la navegación
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nuevoPassword, setNuevoPassword] = useState('');

  // Función para obtener los detalles del usuario
  const fetchUsuario = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/usuarios/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.data.success) {
        const { nombre, email, password } = response.data.usuario;
        setUsuario(response.data.usuario);
        setNombre(nombre);
        setEmail(email);
        setPassword(password);  // Asignamos la contraseña actual (encriptada)
      } else {
        setError('No se pudo obtener los detalles del usuario.');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      setError('Hubo un error al cargar los datos.');
    } finally {
      setLoading(false);
    }
  };

  // Usar useEffect para cargar los datos del usuario cuando el componente se monta
  useEffect(() => {
    fetchUsuario();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const updatedUser = {
        nombre,
        email,
        password, // Este es el password actual, se mandará si no lo modificas
        ...(nuevoPassword && { password: nuevoPassword }), // Solo incluye el nuevo password si se ha proporcionado
      };
  
      const response = await axios.put(
        `http://localhost:5000/api/usuarios/${id}`,
        updatedUser,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
  
      if (response.data.success) {
        // Mostrar mensaje personalizado en el alert
        const message = response.data.message || 'Usuario modificado con éxito';
        alert(message);
  
        // Si hay un nuevo token, actualizarlo en localStorage
        if (response.data.newToken) {
          localStorage.setItem('token', response.data.newToken);
        }
  
        // Redirige a la lista de usuarios
        navigate('/usuarios');
      } else {
        setError('Hubo un error al actualizar los datos del usuario.');
      }
    } catch (error) {
      console.error('Error al modificar el usuario:', error);
      setError('Hubo un error al modificar los datos.');
    }
  };
  

  // Función para regresar a la lista de usuarios
  const handleGoBack = () => {
    navigate('/usuarios');
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Modificar Usuario</h1>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <br />
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Contraseña Actual:</label>
        {/* Mostrar la contraseña actual en texto claro */}
        <input
          type="text" // Cambié de password a text para que sea visible en texto claro
          value={password} // Muestra la contraseña real
          readOnly
        />
        <br />
        <label>Nuevo Password:</label>
        <input
          type="password"
          value={nuevoPassword}
          onChange={(e) => setNuevoPassword(e.target.value)}
        />
        <br />
        <button type="submit" className="boton-modificar">Modificar Datos</button>
      </form>
      {/* Botón "Regresar" que redirige al listado de usuarios */}
      <button onClick={handleGoBack} className="btn btn-secondary mt-3">Regresar</button>
    </div>
  );
}

export default Modificar;
