const mongoose = require('mongoose');

const rutinaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  alumno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  entrenador_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha_asignacion: { type: Date, required: true },
  fecha_fin: { type: Date },
  semanas: [
    {
      numeroSemana: { type: Number, required: true },
      dias: [
        {
          dia: { type: String, required: true },
          ejercicios: [
            {
              ejercicio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ejercicio', required: true },
              nombre: { type: String, required: true },
              series: { type: Number, required: true },
              repeticiones: { type: String, required: true },
              peso_sugerido: { type: String },
              peso_serie_1: { type: Number, default: 0 }, // Peso utilizado en la primera serie
              peso_serie_2: { type: Number, default: 0 }, // Peso utilizado en la segunda serie
              peso_serie_3: { type: Number, default: 0 }, // Peso utilizado en la tercera serie
              requiere_peso: { type: Boolean, default: true },
              bloque: {
                type: String,
                enum: ['A', 'B', 'C', 'D', 'E', 'F', 'Calentamiento', 'Parte Final'],
                default: 'A',
              },
              terminado: { type: Boolean, default: false },
            },
          ],
          comentario: { type: String },
        },
      ],
    },
  ],
  estado: { type: String, enum: ['Activa', 'Inactiva'], default: 'Activa' },
  comentario_profesor: { type: String },
});

// Middleware para calcular automáticamente la fecha_fin
rutinaSchema.pre('save', function (next) {
  if (this.fecha_asignacion) {
    this.fecha_fin = new Date(this.fecha_asignacion);
    this.fecha_fin.setDate(this.fecha_asignacion.getDate() + 28);
  }
  next();
});

const Rutina = mongoose.model('Rutina', rutinaSchema);
module.exports = Rutina;