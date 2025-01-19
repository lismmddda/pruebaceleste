// src/Componentes/Portones/registrar_porton.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function RegistrarPorton() {
  const [motivo, setMotivo] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Portón registrado:', { motivo, fecha, hora });
  };

  return (
    <div className="content-wrapper">
      <section className="content-header">
        <h1>Registrar Nuevo Portón</h1>
      </section>

      <section className="content">
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="motivo">Motivo de la Solicitud</label>
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
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  className="form-control"
                  id="fecha"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="hora">Hora</label>
                <input
                  type="time"
                  className="form-control"
                  id="hora"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Registrar Portón</button>
              <Link to="/Portones" className="btn btn-secondary ml-2">Cancelar</Link>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RegistrarPorton;
