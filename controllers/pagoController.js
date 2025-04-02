const Pago = require("../models/Pago");

// Crear un nuevo pago
const crearPago = async (req, res) => {
    try {
      const { usuario, membresia, metodoPago, monto, estado, descripcion, descuento, rutinaDuracion } = req.body;
  
      const fechaPago = new Date();
      const fechaExpiracion = new Date(fechaPago);
      fechaExpiracion.setDate(fechaExpiracion.getDate() + rutinaDuracion); // Añade la duración de la rutina a la fecha de pago
  
      const nuevoPago = new Pago({
        usuario,
        membresia,
        metodoPago,
        monto,
        fechaPago,
        fechaExpiracion,
        estado,
        descripcion,
        descuento,
        rutinaDuracion,
      });
  
      const pagoGuardado = await nuevoPago.save();
      res.status(201).json(pagoGuardado);
    } catch (error) {
      console.error("Error al crear el pago:", error);
      res.status(500).json({ error: "Error al crear el pago" });
    }
  };

// Obtener todos los pagos
const obtenerPagos = async (req, res) => {
  try {
    const pagos = await Pago.find().populate("usuario", "nombre email"); // Muestra información del usuario relacionado
    res.status(200).json(pagos);
  } catch (error) {
    console.error("Error al obtener los pagos:", error);
    res.status(500).json({ error: "Error al obtener los pagos" });
  }
};

// Obtener un pago por ID
const obtenerPagoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pago = await Pago.findById(id).populate("usuario", "nombre email");

    if (!pago) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.status(200).json(pago);
  } catch (error) {
    console.error("Error al obtener el pago:", error);
    res.status(500).json({ error: "Error al obtener el pago" });
  }
};

// Actualizar un pago
const actualizarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const { membresia, metodoPago, monto, estado, descripcion, descuento } = req.body;

    const pagoActualizado = await Pago.findByIdAndUpdate(
      id,
      { membresia, metodoPago, monto, estado, descripcion, descuento },
      { new: true }
    );

    if (!pagoActualizado) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.status(200).json(pagoActualizado);
  } catch (error) {
    console.error("Error al actualizar el pago:", error);
    res.status(500).json({ error: "Error al actualizar el pago" });
  }
};

// Eliminar un pago
const eliminarPago = async (req, res) => {
  try {
    const { id } = req.params;
    const pagoEliminado = await Pago.findByIdAndDelete(id);

    if (!pagoEliminado) {
      return res.status(404).json({ error: "Pago no encontrado" });
    }

    res.status(200).json({ message: "Pago eliminado exitosamente" });
  } catch (error) {
    console.error("Error al eliminar el pago:", error);
    res.status(500).json({ error: "Error al eliminar el pago" });
  }
};

module.exports = {
  crearPago,
  obtenerPagos,
  obtenerPagoPorId,
  actualizarPago,
  eliminarPago,
};