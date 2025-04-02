const express = require("express");
const router = express.Router();
const {
  crearPago,
  obtenerPagos,
  obtenerPagoPorId,
  actualizarPago,
  eliminarPago,
} = require("../controllers/pagoController");

// Crear un nuevo pago
router.post("/pagos", crearPago);

// Obtener todos los pagos
router.get("/pagos", obtenerPagos);

// Obtener un pago específico por ID
router.get("/pagos/:id", obtenerPagoPorId);

// Actualizar un pago existente
router.put("/pagos/:id", actualizarPago);

// Eliminar un pago existente
router.delete("/pagos/:id", eliminarPago);

module.exports = router;