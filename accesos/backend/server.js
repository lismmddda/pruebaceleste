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

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
