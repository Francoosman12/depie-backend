const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Usuario = require("./models/Usuario"); // Asegúrate de usar el modelo correcto

// Conectar a la base de datos
mongoose.connect("mongodb://localhost:27017/depie-entrenamiento.usuarios", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});
mongoose.connection.on("connected", () => {
    console.log("Conectado a la base de datos MongoDB.");
  });
  
  mongoose.connection.on("error", (err) => {
    console.error("Error en la conexión a MongoDB:", err);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("Desconectado de MongoDB.");
  });

const encriptarContraseñas = async () => {
  try {
    const usuarios = await Usuario.find(); // Obtener todos los usuarios

    for (const usuario of usuarios) {
      // Verificar si la contraseña ya está encriptada
      if (!usuario.password.startsWith("$2b$")) {
        const salt = await bcrypt.genSalt(10); // Generar "sal"
        const hashedPassword = await bcrypt.hash(usuario.password, salt); // Encriptar contraseña

        usuario.password = hashedPassword; // Actualizar contraseña
        await usuario.save(); // Guardar cambios
        console.log(`Contraseña actualizada para usuario: ${usuario.email}`);
      } else {
        console.log(`Contraseña ya encriptada para usuario: ${usuario.email}`);
      }
    }

    console.log("Todas las contraseñas han sido encriptadas.");
    process.exit();
  } catch (error) {
    console.error("Error al encriptar contraseñas:", error);
    process.exit(1);
  }
};

encriptarContraseñas();