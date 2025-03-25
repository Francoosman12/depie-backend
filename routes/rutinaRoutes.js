const express = require('express');
const router = express.Router();
const {
  obtenerRutinas,
  crearRutina,
  obtenerRutinaPorId,
  actualizarRutina,
  eliminarRutina,
  actualizarComentarioProfesor, // Controlador para el comentario del profesor
  actualizarPesoUtilizado, // Controlador para actualizar el peso utilizado en un ejercicio
  actualizarComentarioDia, // Controlador para actualizar comentarios diarios
} = require('../controllers/rutinaController');

// Rutas
// Obtener todas las rutinas (opcionalmente filtradas por alumno_id)
router.get('/', obtenerRutinas);

// Crear una nueva rutina
router.post('/', crearRutina);

// Obtener una rutina específica por su ID
router.get('/:id', obtenerRutinaPorId);

// Actualizar una rutina completa por su ID
router.put('/:id', actualizarRutina);

// Actualizar el comentario del profesor
router.put('/:id/comentario_profesor', actualizarComentarioProfesor);

// Actualizar el peso utilizado de un ejercicio en una rutina
router.put('/:rutinaId/ejercicio/:ejercicioId', actualizarPesoUtilizado);

// Actualizar el comentario diario del alumno en un día específico
router.put('/:id/comentario_dia', actualizarComentarioDia); // Nueva ruta para comentarios diarios

// Eliminar una rutina por su ID
router.delete('/:id', eliminarRutina);

module.exports = router;