const mongoose = require('mongoose');

const rutinaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  alumno_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  entrenador_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  fecha_asignacion: { type: Date, required: true }, // El profesor define la fecha de inicio
  fecha_fin: { type: Date }, // Calculada automáticamente con base en la fecha_asignacion
  semanas: [
    {
      numeroSemana: { type: Number, required: true },
      dias: [
        {
          dia: { type: String, required: true }, // Ejemplo: 'Lunes', 'Martes'
          ejercicios: [
            {
              ejercicio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ejercicio', required: true },
              nombre: { type: String, required: true },
              series: { type: Number, required: true },
              repeticiones: { type: String, required: true },
              peso_sugerido: { type: String },
              peso_utilizado: { type: Number }, // Alumno registra el peso utilizado
              bloque: { 
                type: String, 
                enum: ['A', 'B', 'C', 'D', 'E', 'F', 'Calentamiento', 'Parte Final'], 
                default: 'A', // Bloque del ejercicio
              },
            },
          ],
          comentario: { type: String }, // Comentarios del alumno sobre el día
        },
      ],
    },
  ],
  estado: { type: String, enum: ['Activa', 'Inactiva'], default: 'Activa' }, // Ejemplo: Activa o finalizada
  comentario_profesor: { type: String }, // Comentario general del profesor sobre la rutina
});

// Establecer automáticamente la `fecha_fin` basada en la `fecha_asignacion`
rutinaSchema.pre('save', function (next) {
  if (this.fecha_asignacion) {
    this.fecha_fin = new Date(this.fecha_asignacion);
    this.fecha_fin.setDate(this.fecha_asignacion.getDate() + 28); // Sumar 28 días al inicio
  }
  next();
});

const Rutina = mongoose.model('Rutina', rutinaSchema);
module.exports = Rutina;