const Usuario = require('../models/Usuario'); // Importar el modelo Usuario
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinaryConfig"); // Configuración de Cloudinary
const { CloudinaryStorage } = require("multer-storage-cloudinary");





// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  try {
    // Subir la imagen a Cloudinary (si se proporciona)
    let fotoPerfilUrl = ""; // Por defecto, no hay URL de foto
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path); // Subir la imagen a Cloudinary
      fotoPerfilUrl = result.secure_url; // Guardar la URL de la imagen
    }

    // Generar el "sal" para la encriptación
    const salt = await bcrypt.genSalt(10);

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crear el nuevo usuario con la contraseña encriptada y la URL de la foto
    const nuevoUsuario = new Usuario({
      ...req.body,
      password: hashedPassword, // Guarda la contraseña encriptada
      fotoPerfil: fotoPerfilUrl, // Guarda la URL de la foto
    });

    // Guardar el usuario en la base de datos
    const usuario = await nuevoUsuario.save();

    // Responder con el usuario creado
    res.status(201).json(usuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(400).json({ message: "Error al crear usuario", error });
  }
};


// Obtener un usuario por ID
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id).populate("rutinaAsignada entrenadorAsignado"); // Usar populate para mostrar información relacionada
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuario', error });
  }
};

// Actualizar un usuario por ID
const actualizarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar solo los campos enviados
    Object.keys(req.body).forEach((key) => {
      usuario[key] = req.body[key];
    });

    await usuario.save(); // Guardar los cambios en la base de datos
    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
// Eliminar un usuario por ID
const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado', usuarioEliminado });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar usuario', error });
  }
};

// Agregar un peso al historial de un usuario
const agregarPesoAlHistorial = async (req, res) => {
  try {
    const { fecha, peso } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuario.historialPesos.push({ fecha, peso }); // Agregar peso al historial
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar peso al historial', error });
  }
};

// Registrar progreso de ejercicio
const registrarProgreso = async (req, res) => {
  try {
    const { fecha, ejercicio, pesoUsado, repeticiones, series } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuario.progreso.push({ fecha, ejercicio, pesoUsado, repeticiones, series });
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar progreso', error });
  }
};

// Asignar una rutina a un usuario
const asignarRutina = async (req, res) => {
  try {
    const { rutinaId } = req.body;
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    usuario.rutinaAsignada = rutinaId; // Asignar la rutina al usuario
    usuario.historialRutinas.push({ rutinaId, fechaInicio: new Date() }); // Registrar en el historial de rutinas
    await usuario.save();
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Error al asignar rutina', error });
  }
};

// Actualizar foto de perfil
const actualizarFotoPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Subir la imagen a Cloudinary si existe un archivo
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path); // Subida a Cloudinary
      usuario.fotoPerfil = result.secure_url; // Guardar la URL en el campo fotoPerfil
    } else {
      return res.status(400).json({ message: 'No se proporcionó ninguna imagen.' });
    }

    await usuario.save(); // Guardar cambios en la base de datos
    res.json({ message: 'Foto de perfil actualizada', usuario });
  } catch (error) {
    console.error('Error al actualizar foto de perfil:', error);
    res.status(500).json({ message: 'Error al actualizar foto de perfil', error });
  }
};


module.exports = {
  obtenerUsuarios,
  crearUsuario,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  agregarPesoAlHistorial,
  registrarProgreso,
  asignarRutina,
  actualizarFotoPerfil, // Nuevo controlador para actualizar la foto de perfil
 
};
