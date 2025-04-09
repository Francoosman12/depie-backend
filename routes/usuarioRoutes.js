const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId, // Obtener un usuario por ID
  agregarPesoAlHistorial, // Agregar peso al historial
  registrarProgreso, // Registrar progreso de ejercicios
  asignarRutina, // Asignar una rutina a un usuario
  actualizarFotoPerfil, // Actualizar foto de perfil
} = require('../controllers/usuarioController');
const upload = require('../config/multer');

// Rutas principales
router.get('/', obtenerUsuarios); // Obtener todos los usuarios
router.post('/', upload.single('fotoPerfil'), crearUsuario);
router.put("/:id", actualizarUsuario); // Actualizar un usuario por ID
router.delete('/:id', eliminarUsuario); // Eliminar un usuario por ID

// Rutas adicionales
router.get('/:id', obtenerUsuarioPorId); // Obtener un usuario por ID
router.post('/:id/historial-pesos', agregarPesoAlHistorial); // Agregar peso al historial de un usuario
router.post('/:id/progreso', registrarProgreso); // Registrar progreso de ejercicio
router.post('/:id/asignar-rutina', asignarRutina); // Asignar rutina a un usuario

// Ruta para actualizar la foto de perfil
router.put('/:id/fotoPerfil', upload.single('fotoPerfil'), actualizarFotoPerfil); // Subir y actualizar foto de perfil

module.exports = router;