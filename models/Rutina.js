const mongoose = require('mongoose'); 

const rutinaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  alumno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  entrenador_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
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
            },
          ],
        },
      ],
    },
  ],
  fecha_asignacion: { type: Date, default: Date.now },
  fecha_fin: { type: Date }, // Nuevo campo para fecha de finalización
  estado: { type: String, enum: ['Activa', 'Inactiva'], default: 'Activa' },
});

// Establecer automáticamente la `fecha_fin` como 4 semanas después de `fecha_asignacion`
rutinaSchema.pre('save', function (next) {
  if (!this.fecha_fin) {
    const fechaAsignacion = this.fecha_asignacion || Date.now();
    this.fecha_fin = new Date(fechaAsignacion);
    this.fecha_fin.setDate(this.fecha_fin.getDate() + 28); // Sumar 28 días
  }
  next();
});

const Rutina = mongoose.model('Rutina', rutinaSchema);
module.exports = Rutina;
