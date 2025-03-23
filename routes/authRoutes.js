const express = require("express");
const { loginUsuario } = require("../controllers/authController");

const router = express.Router();

// Ruta para el login
router.post("/login", loginUsuario);

module.exports = router;