import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../public/plugins/fontawesome-free/css/all.min.css'; // FontAwesome
import '../../public/dist/css/adminlte.min.css'; // AdminLTE

function Home() {
  const [rol, setRol] = useState(''); // Estado para el rol
  const [name, setName] = useState(''); // Estado para el nombre
  const [user_id, setUserId] = useState(''); // Estado para el ID del usuario

  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [isPagosOpen, setIsPagosOpen] = useState(false);
  const [isMultasOpen, setIsMultasOpen] = useState(false);
  const [isPermisosOpen, setIsPermisosOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú lateral

  const navigate = useNavigate(); // Usar useNavigate para redirigir

  // Función para manejar el toggle del menú lateral
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Alterna entre abierto y cerrado
  };

  const toggleUsersMenu = () => setIsUsersOpen(!isUsersOpen);
  const toggleRolesMenu = () => setIsRolesOpen(!isRolesOpen);
  const togglePagosMenu = () => setIsPagosOpen(!isPagosOpen);
  const toggleMultasMenu = () => setIsMultasOpen(!isMultasOpen);
  const togglePermisosMenu = () => setIsPermisosOpen(!isPermisosOpen);

  useEffect(() => {
    // Obtener los datos almacenados en localStorage
    const storedName = localStorage.getItem('nombre');
    const storedUserId = localStorage.getItem('user_id');
    const storedRol = localStorage.getItem('rol');  // Obtener el rol de localStorage

    setName(storedName);
    setUserId(storedUserId);
    setRol(storedRol || 'Usuario'); // Ajustar esto dependiendo de la lógica de roles
  }, []); // Esto solo se ejecuta al montar el componente.

  // Función para cerrar sesión
  const handleLogout = () => {
    // Limpiar el estado y redirigir a login
    localStorage.clear();
    navigate('/login'); // Usar navigate en lugar de history.push
  };

  return (
    <div className="hold-transition sidebar-mini">
      <center><h2>Bienvenido, {name} ({rol}) - ID: {user_id}</h2></center>

      <div className="wrapper">
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button" onClick={toggleMenu}>
                <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <aside className={`main-sidebar sidebar-dark-primary elevation-4 ${isMenuOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="#" className="d-block">{name} ({rol})</a>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Menu Usuarios */}
              {rol === 'Administrador' && (
                <li className={`nav-item ${isUsersOpen ? 'menu-open' : ''}`}>
                  <a href="#" className="nav-link active" onClick={toggleUsersMenu}>
                    <i className="nav-icon fas fa-users" />
                    <p>
                      Usuarios
                      <i className={`right fas ${isUsersOpen ? 'fa-chevron-down' : 'fa-chevron-left'}`} />
                    </p>
                  </a>
                  {isUsersOpen && (
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/usuarios" className="nav-link">
                          <i className="fas fa-users nav-icon text-muted" />
                          <p>Listado de usuarios</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/usuarios/registrar" className="nav-link">
                          <i className="fas fa-user-plus nav-icon text-muted" />
                          <p>Registrar usuario</p>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}

              {/* Menu Roles */}
              {rol === 'Administrador' && (
                <li className={`nav-item ${isRolesOpen ? 'menu-open' : ''}`}>
                  <a href="#" className="nav-link active" onClick={toggleRolesMenu}>
                    <i className="nav-icon fas fa-cogs" />
                    <p>
                      Roles
                      <i className={`right fas ${isRolesOpen ? 'fa-chevron-down' : 'fa-chevron-left'}`} />
                    </p>
                  </a>
                  {isRolesOpen && (
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/roles" className="nav-link">
                          <i className="fas fa-cogs nav-icon text-muted" />
                          <p>Gestionar Roles</p>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}

              {/* Menu Pagos */}
              {rol === 'Administrador' && (
                <li className={`nav-item ${isPagosOpen ? 'menu-open' : ''}`}>
                  <a href="#" className="nav-link active" onClick={togglePagosMenu}>
                    <i className="nav-icon fas fa-dollar-sign" />
                    <p>
                      Pagos
                      <i className={`right fas ${isPagosOpen ? 'fa-chevron-down' : 'fa-chevron-left'}`} />
                    </p>
                  </a>
                  {isPagosOpen && (
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/Pagos" className="nav-link">
                          <i className="fas fa-dollar-sign nav-icon text-muted" />
                          <p>Registrar Pago</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Pagos/registrarpago" className="nav-link">
                          <i className="fas fa-plus-circle nav-icon text-muted" />
                          <p>Realizar Pago</p>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}

              {/* Menu Multas */}
              {rol === 'Administrador' && (
                <li className={`nav-item ${isMultasOpen ? 'menu-open' : ''}`}>
                  <a href="#" className="nav-link active" onClick={toggleMultasMenu}>
                    <i className="nav-icon fas fa-exclamation-circle" />
                    <p>
                      Multas
                      <i className={`right fas ${isMultasOpen ? 'fa-chevron-down' : 'fa-chevron-left'}`} />
                    </p>
                  </a>
                  {isMultasOpen && (
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/Multas" className="nav-link">
                          <i className="fas fa-exclamation-circle nav-icon text-muted" />
                          <p>Listado de Multas</p>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link to="/Multas/registrar" className="nav-link">
                          <i className="fas fa-plus-circle nav-icon text-muted" />
                          <p>Registrar Multa</p>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}

              {/* Menu Permisos */}
              {rol === 'Administrador' && (
                <li className={`nav-item ${isPermisosOpen ? 'menu-open' : ''}`}>
                  <a href="#" className="nav-link active" onClick={togglePermisosMenu}>
                    <i className="nav-icon fas fa-key" />
                    <p>
                      Permisos
                      <i className={`right fas ${isPermisosOpen ? 'fa-chevron-down' : 'fa-chevron-left'}`} />
                    </p>
                  </a>
                  {isPermisosOpen && (
                    <ul className="nav nav-treeview">
                      <li className="nav-item">
                        <Link to="/Portones" className="nav-link">
                          <i className="fas fa-key nav-icon text-muted" />
                          <p>Gestionar Permisos</p>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              )}

              <div className="sidebar-footer">
                <button className="btn btn-danger btn-block" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default Home;
