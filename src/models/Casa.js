import { Schema, model } from 'mongoose';

const casaSchema = new Schema({
    caminhoFoto: String,
    descricao: String,
    preco: Number,
    local: String,
    status: Number,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, {
    toJSON: {
        virtuals: true
    }
});

casaSchema.virtual('link_imagem').get(function () {
    return `http://localhost:8080/image/${this.caminhoFoto}`;
})

export default model('Casa', casaSchema);