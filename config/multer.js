const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary'); // Usa CloudinaryStorage
const cloudinary = require('../config/cloudinaryConfig'); // Tu archivo cloudinaryConfig.js

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Cambia a 'user_profiles' si es para usuarios
    allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
  },
});

const upload = multer({ storage: storage });

module.exports = upload;