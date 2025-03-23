const Rutina = require('../models/Rutina');

// Obtener todas las rutinas o filtrar por alumno_id
const obtenerRutinas = async (req, res) => {
  try {
    const { alumno_id } = req.query; // Obtener el alumno_id desde los parámetros de consulta
    const query = alumno_id ? { alumno_id } : {}; // Crear un filtro si se proporciona alumno_id
    const rutinas = await Rutina.find(query).populate({
      path: 'alumno_id',
      select: 'nombre email', // Selecciona solo los campos necesarios
    }).populate({
      path: 'entrenador_id',
      select: 'nombre email',
    }).populate({
      path: 'semanas.dias.ejercicios.ejercicio_id',
    });
    
    res.json(rutinas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener rutinas", error });
  }
};


// Crear una nueva rutina
const crearRutina = async (req, res) => {
  const nuevaRutina = new Rutina(req.body);
  try {
    const rutina = await nuevaRutina.save();
    res.status(201).json(rutina);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear rutina', error });
  }
};

// Obtener una rutina específica por ID
const obtenerRutinaPorId = async (req, res) => {
  try {
    const rutina = await Rutina.findById(req.params.id).populate('alumno_id entrenador_id dias.ejercicios.ejercicio_id');
    if (!rutina) {
      return res.status(404).json({ message: 'Rutina no encontrada' });
    }
    res.json(rutina);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rutina', error });
  }
};

// Actualizar una rutina por ID
const actualizarRutina = async (req, res) => {
  try {
    const rutinaActualizada = await Rutina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rutinaActualizada) {
      return res.status(404).json({ message: 'Rutina no encontrada' });
    }
    res.json(rutinaActualizada);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar rutina', error });
  }
};

// Eliminar una rutina por ID
const eliminarRutina = async (req, res) => {
  try {
    const rutinaEliminada = await Rutina.findByIdAndDelete(req.params.id);
    if (!rutinaEliminada) {
      return res.status(404).json({ message: 'Rutina no encontrada' });
    }
    res.json({ message: 'Rutina eliminada', rutinaEliminada });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar rutina', error });
  }
};

module.exports = {
  obtenerRutinas,
  crearRutina,
  obtenerRutinaPorId,
  actualizarRutina,
  eliminarRutina,
};
