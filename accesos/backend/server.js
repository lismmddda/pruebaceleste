import express from 'express';
import pkg from 'pg';  // Importar el paquete completo de 'pg'
const { Pool } = pkg;  // Extraer 'Pool' del paquete
import cors from 'cors';  // Habilitar CORS para permitir que el frontend interactúe con el backend

const app = express();
const port = 5000;  // Puerto para el backend

// Middleware para manejar solicitudes JSON y CORS
app.use(cors());
app.use(express.json());

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',  // El usuario de tu base de datos
  host: 'localhost',  // El host donde está PostgreSQL (puede cambiar si usas un servicio en la nube)
  database: 'gestion',  // El nombre de la base de datos
  password: '1234',  // La contraseña del usuario
  port: 5432,  // El puerto de PostgreSQL (el valor por defecto es 5432)
});

// Verificar conexión a PostgreSQL
pool.connect()
  .then(() => {
    console.log('Conexión a PostgreSQL establecida correctamente.');
  })
  .catch((err) => {
    console.error('Error al conectar a PostgreSQL:', err);
  });

// Función para manejar errores
const handleDbError = (err, res) => {
  console.error('Error al ejecutar la consulta:', err);
  res.status(500).json({ success: false, message: 'Error en la base de datos' });
};

app.post('/api/login', (req, res) => {
  const { telefono } = req.body;

  // Consultar la base de datos para encontrar el usuario por su teléfono
  pool.query('SELECT * FROM usuarios WHERE telefono = $1', [telefono], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al consultar la base de datos' });
    }

    if (results.rows.length > 0) {
      const usuario = results.rows[0];
      return res.status(200).json({
        success: true,
        user_id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol, // Devolver el rol del usuario
      });
    } else {
      return res.status(404).json({ success: false, message: 'El número de teléfono no está registrado' });
    }
  });
});

// Ruta para registrar una multa
app.post('/api/registrarMulta', (req, res) => {
  const { descripcion, fecha, departamento, monto } = req.body;

  // Validar que todos los campos estén presentes
  if (!descripcion || !fecha || !departamento || !monto) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
  }

  // Consulta SQL para insertar una nueva multa en la base de datos
  const query = 'INSERT INTO multas (descripcion, fecha, departamento, monto) VALUES ($1, $2, $3, $4)';
  
  pool.query(query, [descripcion, fecha, departamento, monto], (err, result) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(200).json({ success: true, message: 'Multa registrada exitosamente' });
  });
});

// Contar las notificaciones
app.get('/api/countNotificaciones', (req, res) => {
  pool.query('SELECT COUNT(*) AS total FROM multas', (err, results) => {
    if (err) {
      return handleDbError(err, res);
    }
    const totalNotificaciones = results.rows[0].total;
    return res.status(200).json({ success: true, totalNotificaciones });
  });
});

// Obtener todas las notificaciones
app.get('/api/notificaciones', (req, res) => {
  pool.query('SELECT * FROM multas', (err, results) => {
    if (err) {
      return handleDbError(err, res);
    }
    return res.status(200).json({ success: true, notificaciones: results.rows });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
