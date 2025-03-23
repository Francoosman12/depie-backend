const express = require('express');
const router = express.Router();
const {
  obtenerEjercicios,
  crearEjercicio,
  obtenerEjercicioPorId,
  actualizarEjercicio,
  eliminarEjercicio,
} = require('../controllers/ejercicioController');

// Rutas
router.get('/', obtenerEjercicios); // Obtener todos los ejercicios
router.post('/', crearEjercicio); // Crear un nuevo ejercicio
router.get('/:id', obtenerEjercicioPorId); // Obtener un ejercicio específico
router.put('/:id', actualizarEjercicio); // Actualizar un ejercicio
router.delete('/:id', eliminarEjercicio); // Eliminar un ejercicio

module.exports = router;
