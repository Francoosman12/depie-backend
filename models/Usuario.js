const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fechaNacimiento: { type: Date },
  genero: { type: String, enum: ['Masculino', 'Femenino', 'Otro'] },
  telefono: { type: String },
  pesoActual: { type: Number },
  altura: { type: Number }, // Altura del usuario en cm
  objetivos: { type: String }, // Objetivos fitness del usuario
  nivelExperiencia: { type: String, enum: ['Principiante', 'Intermedio', 'Avanzado'] },
  condicionesMedicas: { type: String, default: 'Ninguna' }, // Condiciones médicas como hipertensión, diabetes
  rutinaAsignada: { type: mongoose.Schema.Types.ObjectId, ref: 'Rutina' }, // ID de rutina asignada
  historialPesos: [
    {
      fecha: { type: Date },
      peso: { type: Number }, // Peso registrado
    },
  ],
  progresoSemanal: [
    {
      semana: { type: Number }, // Número de semana
      peso: { type: Number }, // Peso registrado semanal
      fotosProgreso: [String], // URLs de fotos de progreso
    },
  ],
  progreso: [
    {
      fecha: { type: Date },
      ejercicio: { type: String }, // Nombre del ejercicio
      pesoUsado: { type: Number }, // Peso levantado
      repeticiones: { type: Number }, // Número de repeticiones
      series: { type: Number }, // Número de series
    },
  ],
  historialRutinas: [
    {
      rutinaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rutina' }, // ID de rutina previa
      fechaInicio: { type: Date }, // Fecha de inicio de la rutina
      fechaFin: { type: Date }, // Fecha de finalización de la rutina
    },
  ],
  fechaRegistro: { type: Date, default: Date.now },
  rol: { type: String, enum: ['alumno', 'profesor'], default: 'alumno' }, // Rol del usuario
  entrenadorAsignado: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }, // ID del entrenador
  metodoRegistro: { type: String, enum: ['email', 'google'] }, // Método de registro
  activo: { type: Boolean, default: true }, // Estado del usuario: activo/inactivo
  direccion: { type: String, default: '' }, // Nueva propiedad para la dirección
  fotoPerfil: { type: String, default: '' }, // Nueva propiedad para URL de la foto de perfil
});

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;