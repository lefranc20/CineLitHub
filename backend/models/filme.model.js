import mongoose from 'mongoose';

const filmeSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    genero: {
        type: String,
        required: true
    },
    imagem: {
        type: String,
        required: true
    },
}, {
    timestamps: true // createdAt, updatedAT (criado em, atualizado em)
});

const Filme = mongoose.model('Filme', filmeSchema);
// Filme -> filmes

export default Filme;