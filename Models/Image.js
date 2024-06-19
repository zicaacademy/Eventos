const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    show: String,
    imagem: String
});

module.exports = mongoose.model('Image', imageSchema, 'galeria');
