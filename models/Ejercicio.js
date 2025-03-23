const mongoose = require('mongoose');

const ejercicioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  video_url: { type: String },
  musculos_trabajados: [{ type: String }],
  dificultad: { type: String, enum: ['Principiante', 'Intermedio', 'Avanzado'], required: true },
  tipo: { type: String, enum: ['Fuerza', 'Cardio', 'Flexibilidad', 'Otro'], required: true },
  equipamiento: [{ type: String }],
  variaciones: [
    {
      nombre: { type: String },
      video_url: { type: String }
    }
  ],
  creado_por: { type: String, default: 'admin' }, // Puede ser 'admin' o 'profesor'
  fecha_creacion: { type: Date, default: Date.now }
});

const Ejercicio = mongoose.model('Ejercicio', ejercicioSchema);

module.exports = Ejercicio;
