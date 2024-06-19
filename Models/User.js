const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: String,
    sobrenome: String,
    nascimento: String,
    senha: String,
    email: String,
    favoritos: Array
});

module.exports = mongoose.model('User', userSchema);
