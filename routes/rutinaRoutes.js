const express = require('express');
const router = express.Router();
const {
  obtenerRutinas,
  crearRutina,
  obtenerRutinaPorId,
  actualizarRutina,
  eliminarRutina,
} = require('../controllers/rutinaController');

// Rutas
router.get('/', obtenerRutinas);
router.post('/', crearRutina);
router.get('/:id', obtenerRutinaPorId);
router.put('/:id', actualizarRutina);
router.delete('/:id', eliminarRutina);

module.exports = router;
