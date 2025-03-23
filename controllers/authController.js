const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/Usuario"); // Importar el modelo correcto

// Función para generar un JWT
const generarJWT = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido."); // Error si falta JWT_SECRET
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Login de usuario
const loginUsuario = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Buscar usuario por email
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Comparar contraseñas usando bcrypt
      const isPasswordValid = await bcrypt.compare(password, usuario.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // Generar el token para el usuario
      const token = generarJWT(usuario._id);
  
      // Crear un objeto del usuario sin la contraseña
      const { password: _, ...usuarioSinPassword } = usuario.toObject(); // "_": el hash de la contraseña no se usará
      res.status(200).json({ token, usuario: usuarioSinPassword });
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  };

module.exports = { loginUsuario };