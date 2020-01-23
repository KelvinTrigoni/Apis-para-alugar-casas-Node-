import { Schema, model } from 'mongoose';

const reservaSchema = new Schema({
    data: String,
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    casa: {
        type: Schema.Types.ObjectId,
        ref: 'Casa'
    },
});

export default model('Reserva', reservaSchema);