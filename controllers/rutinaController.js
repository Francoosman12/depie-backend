const Rutina = require('../models/Rutina');

// Obtener todas las rutinas o filtrar por alumno_id
const obtenerRutinas = async (req, res) => {
  try {
    const { alumno_id } = req.query;
    const query = alumno_id ? { alumno_id } : {};
    const rutinas = await Rutina.find(query)
      .populate({
        path: "semanas.dias.ejercicios.ejercicio_id",
        select: "nombre descripcion video_url", // ✅ Asegurar que `video_url` se incluye
      });

    console.log("Rutinas enviadas desde la API:", JSON.stringify(rutinas, null, 2)); // ✅ Revisar si `video_url` está presente
    res.json(rutinas);
  } catch (error) {
    console.error("Error al obtener rutinas:", error);
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

// Actualizar el comentario del profesor en una rutina
const actualizarComentarioProfesor = async (req, res) => {
  try {
    const { id } = req.params; // ID de la rutina desde los parámetros
    const { comentario_profesor } = req.body; // Comentario enviado en el body de la solicitud

    // Buscar la rutina por ID
    const rutina = await Rutina.findById(id);
    if (!rutina) {
      return res.status(404).json({ message: 'Rutina no encontrada' });
    }

    // Actualizar el campo comentario_profesor
    rutina.comentario_profesor = comentario_profesor || rutina.comentario_profesor;

    // Guardar los cambios
    await rutina.save();

    res.status(200).json({ message: 'Comentario del profesor actualizado exitosamente', rutina });
  } catch (error) {
    console.error('Error al actualizar el comentario del profesor:', error);
    res.status(500).json({ message: 'Error al actualizar el comentario del profesor', error });
  }
};

const actualizarPesoUtilizado = async (req, res) => {
  try {
    const { rutinaId, numeroSemana, dia, ejercicioId } = req.params;
    const { peso_serie_1, peso_serie_2, peso_serie_3, terminado } = req.body;

    const rutina = await Rutina.findById(rutinaId);
    if (!rutina) {
      return res.status(404).json({ message: "Rutina no encontrada." });
    }

    // Buscar la semana específica
    const semana = rutina.semanas.find((s) => s.numeroSemana == numeroSemana);
    if (!semana) {
      return res.status(404).json({ message: "Semana no encontrada." });
    }

    // Buscar el día dentro de esa semana
    const diaEntrenamiento = semana.dias.find((d) => d.dia === dia);
    if (!diaEntrenamiento) {
      return res.status(404).json({ message: "Día de entrenamiento no encontrado." });
    }

    // Buscar el ejercicio por su _id único dentro del día específico
    const ejercicio = diaEntrenamiento.ejercicios.find(
      (e) => e._id.toString() === ejercicioId // Aquí validamos que sea el ejercicio correcto dentro de esa semana/día
    );

    if (!ejercicio) {
      return res.status(404).json({ message: "Ejercicio no encontrado en este día." });
    }

    // Actualizar los pesos utilizados solo en esta instancia del ejercicio
    ejercicio.peso_serie_1 = peso_serie_1 || 0;
    ejercicio.peso_serie_2 = peso_serie_2 || 0;
    ejercicio.peso_serie_3 = peso_serie_3 || 0;
    ejercicio.terminado = terminado;

    await rutina.save();
    res.status(200).json({
      message: "Pesos utilizados actualizados en la semana y día correctos.",
      ejercicio,
    });
  } catch (error) {
    console.error("Error al actualizar los pesos utilizados:", error);
    res.status(500).json({ message: "Error al actualizar los pesos utilizados.", error });
  }
};

const actualizarComentarioDia = async (req, res) => {
  try {
    const { id } = req.params; // ID de la rutina
    const { dia, comentario } = req.body; // Día y comentario enviados en el body

    // Buscar la rutina por ID
    const rutina = await Rutina.findById(id);
    if (!rutina) {
      return res.status(404).json({ message: 'Rutina no encontrada' });
    }

    // Buscar el día correspondiente y actualizar el comentario
    let diaActualizado = null;
    rutina.semanas.forEach((semana) => {
      semana.dias.forEach((d) => {
        if (d.dia === dia) {
          d.comentario = comentario; // Actualizar el comentario del día
          diaActualizado = d;
        }
      });
    });

    if (!diaActualizado) {
      return res.status(404).json({ message: 'Día no encontrado en la rutina' });
    }

    // Guardar los cambios
    await rutina.save();
    res.status(200).json({ message: `Comentario para el día ${dia} guardado`, dia: diaActualizado });
  } catch (error) {
    console.error('Error al guardar el comentario del día:', error);
    res.status(500).json({ message: 'Error al guardar el comentario del día', error });
  }
};

module.exports = {
  obtenerRutinas,
  crearRutina,
  obtenerRutinaPorId,
  actualizarRutina,
  eliminarRutina,
  actualizarComentarioProfesor,
  actualizarPesoUtilizado,
  actualizarComentarioDia, // Nuevo controlador
};