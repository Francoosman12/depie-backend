const mongoose = require("mongoose");

const pagoSchema = new mongoose.Schema({
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Usuario", 
    required: true 
  },
  membresia: {
    type: String,
    enum: ["mensual", "trimestral", "semestral", "anual", "personalizado"], 
    required: true,
  },
  metodoPago: {
    type: String,
    enum: ["efectivo", "tarjeta", "transferencia", "Paypal"],
    required: true,
  },
  monto: { 
    type: Number, 
    required: true 
  },
  fechaPago: { 
    type: Date, 
    default: Date.now 
  },
  fechaExpiracion: { 
    type: Date, 
    required: true 
  },
  estado: { 
    type: String, 
    enum: ["pendiente", "completado", "fallido", "reembolsado"], 
    default: "pendiente" 
  },
  descripcion: { 
    type: String, 
    maxlength: 200, 
    default: "" 
  },
  descuento: { 
    type: Number, 
    default: 0 
  },
  referenciaTransaccion: { 
    type: String, 
    default: null 
  },
  rutinaDuracion: { 
    type: Number, 
    required: true 
  } // Duración de la rutina en días
});

module.exports = mongoose.model("Pago", pagoSchema);