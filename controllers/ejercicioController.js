const Ejercicio = require('../models/Ejercicio');

// Obtener todos los ejercicios
const obtenerEjercicios = async (req, res) => {
  try {
    const ejercicios = await Ejercicio.find();
    res.json(ejercicios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ejercicios', error });
  }
};

// Crear un nuevo ejercicio
const crearEjercicio = async (req, res) => {
  const nuevoEjercicio = new Ejercicio(req.body);
  try {
    const ejercicio = await nuevoEjercicio.save();
    res.status(201).json(ejercicio);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear ejercicio', error });
  }
};

// Obtener un ejercicio específico por ID
const obtenerEjercicioPorId = async (req, res) => {
  try {
    const ejercicio = await Ejercicio.findById(req.params.id);
    if (!ejercicio) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    res.json(ejercicio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener ejercicio', error });
  }
};

// Actualizar un ejercicio por ID
const actualizarEjercicio = async (req, res) => {
  try {
    const ejercicioActualizado = await Ejercicio.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ejercicioActualizado) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    res.json(ejercicioActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar ejercicio', error });
  }
};

// Eliminar un ejercicio por ID
const eliminarEjercicio = async (req, res) => {
  try {
    const ejercicioEliminado = await Ejercicio.findByIdAndDelete(req.params.id);
    if (!ejercicioEliminado) {
      return res.status(404).json({ message: 'Ejercicio no encontrado' });
    }
    res.json({ message: 'Ejercicio eliminado', ejercicioEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar ejercicio', error });
  }
};

module.exports = {
  obtenerEjercicios,
  crearEjercicio,
  obtenerEjercicioPorId,
  actualizarEjercicio,
  eliminarEjercicio,
};
