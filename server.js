const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Importar cors
const connectDB = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const ejercicioRoutes = require('./routes/ejercicioRoutes'); // Importa las rutas de ejercicios
const rutinaRoutes = require('./routes/rutinaRoutes');
const authRoutes = require("./routes/authRoutes");



// Configuración inicial
dotenv.config();
const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({
  origin: 'http://localhost:5173', // Permite el frontend (cambia según tu entorno)
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true // Si necesitas cookies o headers adicionales
}));

// Conexión a la base de datos
connectDB();

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/ejercicios', ejercicioRoutes); // Agrega las rutas de ejercicios
app.use('/api/rutinas', rutinaRoutes);
app.use("/api/auth", authRoutes);




// Ruta principal
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la API del gimnasio!');
});

// Puerto del servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
