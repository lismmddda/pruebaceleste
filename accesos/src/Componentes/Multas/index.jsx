import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importar useNavigate

function Multas() {
  const [multas, setMultas] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();  // Inicializar el hook de navegación

  useEffect(() => {
    // Hacer la solicitud GET al servidor para obtener las multas
    axios.get('http://localhost:5000/api/multas', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Asegúrate de enviar el token en el header
      }
    })
      .then(response => {
        if (response.data.success) {
          setMultas(response.data.multas);
        } else {
          console.error('Error al obtener las multas');
        }
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Esto solo se ejecuta una vez cuando el componente se monta

  const handleAddMulta = () => {
    // Redirigir a la página de registrar multa
    navigate('/multas/registrar');
  };

  // Función para manejar el clic en el botón de Cancelar
  const handleCancel = () => {
    navigate('/Home'); // Redirige a la página Home.jsx
  };

  if (loading) {
    return <p>Cargando multas...</p>;
  }

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <center><h1>Listado de Multas</h1></center>
        <button onClick={handleAddMulta} className="btn btn-success">Agregar Multa</button>
      </section>
      <section className="content">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Fecha</th>
              <th>Departamento</th>
              <th>Monto</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {multas.map((multa, index) => (
              <tr key={index}>
                <td>{multa.descripcion}</td>
                <td>{multa.fecha}</td>
                <td>{multa.departamento}</td>
                <td>{multa.monto}</td>
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

export default Multas;
