import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../public/plugins/fontawesome-free/css/all.min.css'; // FontAwesome
import '../../public/dist/css/adminlte.min.css'; // AdminLTE
import "../Componentes/Multas/Notificaciones.css"
import { FaEllipsisV } from "react-icons/fa"; // Importamos el icono
import "./Multas/Notificaciones.css"
import "./Multas/NotificacionContext"

const Home = () => {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState([]);
  const [newNotificationsCount, setNewNotificationsCount] = useState(0);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [rol, setRol] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isRolesOpen, setIsRolesOpen] = useState(false);
  const [isPagosOpen, setIsPagosOpen] = useState(false);
  const [isMultasOpen, setIsMultasOpen] = useState(false);
  const [isPermisosOpen, setIsPermisosOpen] = useState(false);

  // Funciones de toggle para los submenús
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUsersMenu = () => setIsUsersOpen(!isUsersOpen);
  const toggleRolesMenu = () => setIsRolesOpen(!isRolesOpen);
  const togglePagosMenu = () => setIsPagosOpen(!isPagosOpen);
  const toggleMultasMenu = () => setIsMultasOpen(!isMultasOpen);
  const togglePermisosMenu = () => setIsPermisosOpen(!isPermisosOpen);

  // Función para redirigir al usuario a la vista de notificaciones
  const handleNotificacionesClick = () => {
    navigate('/Notificaciones');
  };

  // Función para cerrar sesión y redirigir a login
  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); // Redirige a la página de Login
  };

  // Función para cargar las notificaciones desde el backend
  const fetchNotifications = () => {
    const token = localStorage.getItem('token');  // Obtiene el token desde localStorage

    if (!token) {
      console.error('Token no disponible');
      return;
    }

    fetch('http://localhost:5000/api/notificaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setNotificaciones(data.notificaciones);  // Actualiza las notificaciones
          setNewNotificationsCount(data.notificaciones.length);  // Actualiza el contador de notificaciones
        }
      })
      .catch(err => {
        console.error('Error al obtener las notificaciones', err);
      });
  };

  // Obtener el contador de notificaciones al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');  // Obtiene el token desde localStorage

    if (!token) {
      console.error('Token no disponible');
      return;
    }

    fetch('http://localhost:5000/api/countNotificaciones', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Enviar el token en la cabecera
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log('Total de notificaciones:', data.totalNotificaciones);  // Verifica la respuesta en la consola
          setNewNotificationsCount(data.totalNotificaciones); // Establece el contador de notificaciones
        }
      })
      .catch(err => {
        console.error('Error al obtener las notificaciones', err);
      });

    // Configuramos el intervalo para que se actualice cada 5 segundos
    const intervalId = setInterval(fetchNotifications, 5000); // Actualiza las notificaciones cada 5 segundos

    return () => clearInterval(intervalId); // Limpiar el intervalo cuando el componente se desmonte
  }, []);

  // Obtención de datos desde el localStorage
  useEffect(() => {
    const storedName = localStorage.getItem('nombre');
    const storedUserId = localStorage.getItem('user_id');
    const storedRol = localStorage.getItem('rol');
  
    if (storedName && storedUserId && storedRol) {
      setName(storedName);
      setUserId(storedUserId);
      setRol(storedRol);  // Asegúrate de tener un valor adecuado para el rol
    } else {
      navigate('/'); // Redirige al login si no hay datos en localStorage
    }
  }, [navigate]);

  return (
    <div className="hold-transition sidebar-mini">
      <center><h2>Bienvenido, {name} ({rol}) - ID: {userId}</h2></center>
      
      {/* Botón de notificaciones */}
      <button 
        className="btn btn-secondary float-right mr-2"
        onClick={handleNotificacionesClick}
      >
        Notificaciones
        <span className="notification-counter">{newNotificationsCount}</span>
      </button>
      
      {/* Barra de navegación superior */}
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

      {/* Contenido principal */}
      <section className='content-header'>
        <h1>Listado</h1>
      </section>

      <section className='content'>
        <div className='card'>
          <div className='card-header'>
            <h3 className='card-title'>Administrar multas</h3>
          </div>
        </div>
      </section>

      {/* Menú lateral */}
      <aside className={`main-sidebar sidebar-dark-primary elevation-4 ${isMenuOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="info">
              <a href="#" className="d-block">{name} ({rol})</a>
            </div>
          </div>

          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              {/* Menú Usuarios */}
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

              {/* Menú Roles */}
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

              {/* Menú Pagos */}
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

              {/* Menú Multas */}
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

              {/* Menú Permisos */}
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

              {/* Cerrar sesión */}
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
};

export default Home;
