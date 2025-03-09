import express from 'express';
import pkg from 'pg';
import cors from 'cors';
import jwt from 'jsonwebtoken';

const { Pool } = pkg;

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gestion',
  password: '1234',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Conectar a la base de datos
pool.connect()
  .then(() => console.log('Conexión a PostgreSQL exitosa.'))
  .catch(err => console.error('Error al conectar con PostgreSQL', err));

// Función para manejar errores
const handleDbError = (err, res) => {
  console.error('Error en la base de datos', err);
  res.status(500).json({ success: false, message: 'Error en la base de datos' });
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token no proporcionado' });
  }

  const bearerToken = token.split(' ')[1];

  if (!bearerToken) {
    return res.status(403).json({ success: false, message: 'Token no proporcionado o formato incorrecto' });
  }

  jwt.verify(bearerToken, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token inválido o expirado' });
    }

    // Verificar si la versión del token coincide con la versión en la base de datos
    pool.query('SELECT token_version FROM usuarios WHERE id = $1', [decoded.user_id], (err, results) => {
      if (err) return handleDbError(err, res);

      if (results.rows.length > 0) {
        const user = results.rows[0];

        // Si la versión del token en la base de datos es diferente a la del token decodificado, el token es inválido
        if (decoded.token_version !== user.token_version) {
          return res.status(401).json({
            success: false,
            message: 'Sesión cerrada, por favor inicie sesión nuevamente.',
          });
        }

        req.user = decoded;
        next();
      } else {
        return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      }
    });
  });
};

// Middleware para verificar el rol del usuario
const verifyRole = (role) => {
  return (req, res, next) => {
    if (req.user.rol !== role) {
      return res.status(403).json({ success: false, message: 'Acceso denegado: rol insuficiente' });
    }
    next();
  };
};

// Ruta de login
app.post('/api/login', (req, res) => {
  const { telefono, password } = req.body;

  pool.query('SELECT * FROM usuarios WHERE telefono = $1', [telefono], (err, results) => {
    if (err) return handleDbError(err, res);

    if (results.rows.length > 0) {
      const usuario = results.rows[0];

      // Verificar si el campo token está vacío
      if (!usuario.token || usuario.token.trim() === '') {
        return res.status(400).json({ success: false, message: 'El usuario no tiene un token válido. No puede iniciar sesión.' });
      }

      // Verificación de la contraseña
      if (usuario.password !== password) {
        return res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign(
        { user_id: usuario.id, rol: usuario.rol, nombre: usuario.nombre, token_version: usuario.token_version },  // Incluir token_version en el payload
        'your-secret-key',
        { expiresIn: '1h' }  // El token expira en una hora
      );

      // Aquí puedes guardar el token en la base de datos si es necesario
      pool.query('UPDATE usuarios SET token = $1 WHERE id = $2', [token, usuario.id], (err) => {
        if (err) return handleDbError(err, res);

        return res.status(200).json({
          success: true,
          token,
          user_id: usuario.id,
          nombre: usuario.nombre,
          rol: usuario.rol
        });
      });
    } else {
      return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    }
  });
});


app.get('/api/usuarios', verifyToken, verifyRole('Administrador'), (req, res) => {
  pool.query('SELECT * FROM usuarios', (err, results) => {
    if (err) return handleDbError(err, res);

    return res.status(200).json({ success: true, usuarios: results.rows });
  });
});
// Ruta para obtener un usuario por su ID
app.get('/api/usuarios/:id', verifyToken, (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM usuarios WHERE id = $1', [id], (err, results) => {
    if (err) return handleDbError(err, res);

    if (results.rows.length > 0) {
      return res.status(200).json({
        success: true,
        usuario: results.rows[0],
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }
  });
});

// Ruta para modificar un usuario (actualizar la contraseña y token_version)
app.put('/api/usuarios/:id', verifyToken, (req, res) => {
  const { id } = req.params;
  const { nombre, email, password, nuevoPassword } = req.body;

  // Asegúrate de que los campos necesarios estén presentes
  if (!nombre || !email || (!password && !nuevoPassword)) {
    return res.status(400).json({ success: false, message: 'Nombre, email y contraseña son requeridos' });
  }

  const query = `
    UPDATE usuarios
    SET nombre = $1, email = $2, password = $3, token_version = token_version + 1
    WHERE id = $4
    RETURNING *;
  `;

  pool.query(query, [nombre, email, nuevoPassword || password, id], (err, result) => {
    if (err) return handleDbError(err, res);

    if (result.rows.length > 0) {
      const usuarioModificado = result.rows[0];

      // Aquí anulamos todos los tokens anteriores
      pool.query('UPDATE usuarios SET token = NULL WHERE id = $1', [id], (err) => {
        if (err) return handleDbError(err, res);

        // Generar un nuevo token con la nueva version
        const newToken = jwt.sign(
          { user_id: usuarioModificado.id, rol: usuarioModificado.rol, nombre: usuarioModificado.nombre, token_version: usuarioModificado.token_version },
          'your-secret-key',
          { expiresIn: '1h' }
        );

        // Responder con el nuevo token y el mensaje
        return res.status(200).json({
          success: true,
          message: `Contraseña modificada correctamente. La sesión ha sido cerrada en otros dispositivos. Usuario: ${usuarioModificado.nombre}`,
          newToken: newToken,  // Enviar el nuevo token al frontend
          usuario: usuarioModificado,
        });
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }
  });
});

// Ruta para obtener notificaciones
app.get('/api/notificaciones', verifyToken, (req, res) => {
  pool.query('SELECT * FROM multas', (err, results) => {
    if (err) return handleDbError(err, res);

    return res.status(200).json({ success: true, notificaciones: results.rows });
  });
});

// Ruta para verificar el token
app.get('/api/verifyToken', verifyToken, (req, res) => {
  res.status(200).json({ success: true, message: 'Token válido' });
});

// Ruta para registrar una multa
app.post('/api/registrarMulta', verifyToken, (req, res) => {
  const { descripcion, fecha, departamento, monto } = req.body;

  if (!descripcion || !fecha || !departamento || !monto) {
    return res.status(200).json({ success: false, message: 'Todos los campos son requeridos' });
  }

  const query = 'INSERT INTO multas (descripcion, fecha, departamento, monto) VALUES ($1, $2, $3, $4)';
  
  pool.query(query, [descripcion, fecha, departamento, monto], (err) => {
    if (err) return handleDbError(err, res);

    return res.status(200).json({ success: true, message: 'Multa registrada exitosamente' });
  });
});

// Ruta para contar las notificaciones
app.get('/api/countNotificaciones', verifyToken, (req, res) => {
  pool.query('SELECT COUNT(*) AS total FROM multas', (err, results) => {
    if (err) return handleDbError(err, res);

    return res.status(200).json({ success: true, totalNotificaciones: results.rows[0].total });
  });
});

// Ruta para obtener todas las notificaciones
app.get('/api/notificaciones', verifyToken, (req, res) => {
  pool.query('SELECT * FROM multas', (err, results) => {
    if (err) return handleDbError(err, res);

    return res.status(200).json({ success: true, notificaciones: results.rows });
  });
});

// Ruta para obtener todas las multas con los campos especificados
app.get('/api/multas', verifyToken, (req, res) => {
  const query = 'SELECT descripcion, fecha, departamento, monto FROM multas';

  pool.query(query, (err, results) => {
    if (err) return handleDbError(err, res);

    return res.status(200).json({ success: true, multas: results.rows });
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Backend corriendo en el puerto ${port}`);
});
