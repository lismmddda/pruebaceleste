import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';  // Habilitar CORS para permitir que el frontend interactúe con el backend

const app = express();
const port = 5000;  // Puerto para el backend

// Middleware para manejar solicitudes JSON y CORS
app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion',
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Ruta de inicio de sesión
app.post('/api/login', (req, res) => {
  const { telefono } = req.body;

  // Consultar la base de datos para encontrar el usuario por su teléfono
  db.query('SELECT * FROM usuarios WHERE telefono = ?', [telefono], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al consultar la base de datos' });
    }

    if (results.length > 0) {
      const usuario = results[0];
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

app.post('/api/registrarMulta', (req, res) => {
  const { descripcion, fecha, departamento, monto } = req.body;

  // Validar que todos los campos estén presentes
  if (!descripcion || !fecha || !departamento || !monto) {
    return res.status(400).json({ success: false, message: 'Todos los campos son requeridos' });
  }

  // Consulta SQL para insertar una nueva multa en la base de datos
  const query = 'INSERT INTO multas (descripcion, fecha, departamento, monto) VALUES (?, ?, ?, ?)';
  
  db.query(query, [descripcion, fecha, departamento, monto], (err, result) => {
    if (err) {
      console.error('Error al registrar la multa:', err);
      return res.status(500).json({ success: false, message: 'Error al registrar la multa' });
    }
    return res.status(200).json({ success: true, message: 'Multa registrada exitosamente' });
  });
});




app.get('/api/countNotificaciones', (req, res) => {
  db.query('SELECT COUNT(*) AS total FROM multas', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al contar las notificaciones' });
    }
    const totalNotificaciones = results[0].total;
    return res.status(200).json({ success: true, totalNotificaciones });
  });
});


app.get('/api/notificaciones', (req, res) => {
  db.query('SELECT * FROM multas', (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error al obtener las notificaciones' });
    }
    return res.status(200).json({ success: true, notificaciones: results });
  });
});



// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});