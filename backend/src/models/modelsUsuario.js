const mongoose = require('mongoose')
const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String
    },
    email: {
        type: String,
    },
    senha: {
        type: String
    },
    role:  {
        type: String,
        enum: ['user', 'admin'],
        required: true,
        default: 'user' 
    }
});

const Usuario = mongoose.model('Usuario', usuarioSchema)

module.exports = Usuario