const express = require('express');
const router = express.Router();
const {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  obtenerUsuarioPorId, // Nuevo: obtener un usuario por ID
  agregarPesoAlHistorial, // Nuevo: agregar peso al historial
  registrarProgreso, // Nuevo: registrar progreso de ejercicios
  asignarRutina, // Nuevo: asignar una rutina a un usuario
} = require('../controllers/usuarioController');

// Rutas
router.get('/', obtenerUsuarios); // Obtener todos los usuarios
router.post('/', crearUsuario); // Crear un nuevo usuario
router.put('/:id', actualizarUsuario); // Actualizar un usuario por ID
router.delete('/:id', eliminarUsuario); // Eliminar un usuario por ID

// Nuevas rutas
router.get('/:id', obtenerUsuarioPorId); // Obtener un usuario por ID
router.post('/:id/historial-pesos', agregarPesoAlHistorial); // Agregar peso al historial de un usuario
router.post('/:id/progreso', registrarProgreso); // Registrar progreso de ejercicio
router.post('/:id/asignar-rutina', asignarRutina); // Asignar rutina a un usuario

module.exports = router;
