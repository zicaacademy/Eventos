const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    autor: String,
    evento: String,
    data: {
        completa: String,
        simples: String,
        horario: String,
        dia: Number,
        mes: Number,
        ano: Number,
    },
    local: {
        link: String,
        embed: String,
        endereco: String,
        local: String,
        estado: String,
        cidade: String
    },
    imagem: String
});

module.exports = mongoose.model('Show', showSchema);
